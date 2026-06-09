# AI Agents Dashboard — Technical Setup Guide

## Quick Start (Deploy in 1 Hour)

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Vercel account (for hosting)
- SendGrid API key
- Slack bot token

---

## Part 1: Database Schema

### PostgreSQL Setup

```sql
-- Agent Logs Table
CREATE TABLE agent_logs (
  id SERIAL PRIMARY KEY,
  agent_id VARCHAR(100) NOT NULL,
  agent_name VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  status VARCHAR(50),
  task_type VARCHAR(100),
  input_data JSONB,
  output_data JSONB,
  execution_time_ms INTEGER,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agent Metrics Table
CREATE TABLE agent_metrics (
  id SERIAL PRIMARY KEY,
  agent_id VARCHAR(100),
  agent_name VARCHAR(255),
  department VARCHAR(100),
  tasks_today INTEGER DEFAULT 0,
  tasks_this_week INTEGER DEFAULT 0,
  tasks_this_month INTEGER DEFAULT 0,
  total_time_saved_hours DECIMAL(10,2),
  estimated_value_created DECIMAL(15,2),
  error_rate DECIMAL(5,2),
  average_response_time_ms INTEGER,
  quality_score DECIMAL(5,2),
  created_date DATE,
  PRIMARY KEY (agent_id, created_date)
);

-- Email Tracking Table
CREATE TABLE email_tracking (
  id SERIAL PRIMARY KEY,
  agent_id VARCHAR(100),
  recipient_email VARCHAR(255),
  subject_line VARCHAR(255),
  email_type VARCHAR(100),
  sendgrid_message_id VARCHAR(255),
  sent_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  bounced BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Slack Messages Table
CREATE TABLE slack_messages (
  id SERIAL PRIMARY KEY,
  agent_id VARCHAR(100),
  channel_id VARCHAR(100),
  message_ts VARCHAR(100),
  message_type VARCHAR(50),
  message_content JSONB,
  thread_ts VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_agent_logs_agent_id ON agent_logs(agent_id);
CREATE INDEX idx_agent_logs_created_at ON agent_logs(created_at);
CREATE INDEX idx_agent_metrics_agent_id ON agent_metrics(agent_id);
CREATE INDEX idx_email_tracking_agent_id ON email_tracking(agent_id);
CREATE INDEX idx_slack_messages_agent_id ON slack_messages(agent_id);
```

---

## Part 2: Backend API (Node.js + Express)

### Project Setup

```bash
mkdir mediabubble-ai-dashboard
cd mediabubble-ai-dashboard
npm init -y
npm install express cors dotenv pg socket.io axios
npm install -D nodemon
```

### .env Configuration

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mediabubble_ai
DATABASE_POOL_SIZE=20

# SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=agents@mediabubble.co

# Slack
SLACK_BOT_TOKEN=xoxb-xxxxxxxxxxxxx
SLACK_SIGNING_SECRET=xxxxxxxxxxxxx
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXX

# Server
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://mediabubble-ai.yoursite.com
```

### server.js

```javascript
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const { Pool } = require('pg');
const axios = require('axios');
require('dotenv').config();

const app = express();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// WebSocket Setup
const io = new Server(app, { cors: { origin: process.env.CORS_ORIGIN } });

// ==================== ENDPOINTS ====================

// 1. Log Agent Execution
app.post('/api/agents/log', async (req, res) => {
  const { agent_id, agent_name, department, status, task_type, execution_time_ms, output_data, error_message } = req.body;
  
  try {
    const result = await db.query(
      `INSERT INTO agent_logs (agent_id, agent_name, department, status, task_type, execution_time_ms, output_data, error_message)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [agent_id, agent_name, department, status, task_type, execution_time_ms, JSON.stringify(output_data), error_message]
    );
    
    // Update metrics
    await updateAgentMetrics(agent_id, agent_name, department);
    
    // Broadcast to dashboard
    io.emit('agent-update', { agent_id, status, execution_time_ms });
    
    res.json({ success: true, log_id: result.rows[0].id });
  } catch (err) {
    console.error('Error logging execution:', err);
    res.status(500).json({ error: err.message });
  }
});

// 2. Get All Agents Status (for overview dashboard)
app.get('/api/dashboard/overview', async (req, res) => {
  try {
    const metrics = await db.query(
      `SELECT * FROM agent_metrics WHERE created_date = CURRENT_DATE ORDER BY estimated_value_created DESC`
    );
    
    const stats = {
      total_agents: 45,
      active_agents: 45,
      error_rate: (await calculateGlobalErrorRate()).toFixed(2),
      total_value_today: metrics.rows.reduce((sum, m) => sum + (m.estimated_value_created || 0), 0),
      total_time_saved: metrics.rows.reduce((sum, m) => sum + (m.total_time_saved_hours || 0), 0),
      agents_by_department: await getAgentsByDepartment(),
      top_agents: metrics.rows.slice(0, 5),
      alerts: await getActiveAlerts()
    };
    
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get Department View
app.get('/api/dashboard/department/:dept', async (req, res) => {
  const { dept } = req.params;
  try {
    const agents = await db.query(
      `SELECT * FROM agent_metrics WHERE department = $1 AND created_date = CURRENT_DATE ORDER BY estimated_value_created DESC`,
      [dept]
    );
    
    const logs = await db.query(
      `SELECT * FROM agent_logs WHERE department = $1 AND created_at > NOW() - INTERVAL '24 hours' ORDER BY created_at DESC LIMIT 50`,
      [dept]
    );
    
    res.json({ agents: agents.rows, recent_actions: logs.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get Single Agent Deep Dive
app.get('/api/dashboard/agent/:agent_id', async (req, res) => {
  const { agent_id } = req.params;
  try {
    const metrics = await db.query(
      `SELECT * FROM agent_metrics WHERE agent_id = $1 AND created_date = CURRENT_DATE`,
      [agent_id]
    );
    
    const logs = await db.query(
      `SELECT * FROM agent_logs WHERE agent_id = $1 ORDER BY created_at DESC LIMIT 100`,
      [agent_id]
    );
    
    const email_stats = await db.query(
      `SELECT COUNT(*) as sent, COUNT(opened_at) as opened, COUNT(clicked_at) as clicked
       FROM email_tracking WHERE agent_id = $1 AND sent_at > NOW() - INTERVAL '7 days'`,
      [agent_id]
    );
    
    res.json({
      metrics: metrics.rows[0],
      recent_logs: logs.rows,
      email_stats: email_stats.rows[0],
      uptime_percentage: await calculateUptime(agent_id)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Send Email from Agent
app.post('/api/email/send', async (req, res) => {
  const { agent_id, recipient_email, subject, template, data } = req.body;
  
  try {
    const response = await axios.post('https://api.sendgrid.com/v3/mail/send', {
      personalizations: [{ to: [{ email: recipient_email }] }],
      from: { email: process.env.SENDGRID_FROM_EMAIL, name: 'MediaBubble AI' },
      subject: subject,
      template_id: template,
      dynamic_template_data: data
    }, {
      headers: { 'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}` }
    });
    
    // Log email sent
    await db.query(
      `INSERT INTO email_tracking (agent_id, recipient_email, subject_line, email_type, sendgrid_message_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [agent_id, recipient_email, subject, req.body.email_type, response.headers['x-message-id']]
    );
    
    res.json({ success: true, message_id: response.headers['x-message-id'] });
  } catch (err) {
    console.error('SendGrid error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 6. Post Slack Message from Agent
app.post('/api/slack/post', async (req, res) => {
  const { channel, text, blocks, agent_id, message_type } = req.body;
  
  try {
    const response = await axios.post(process.env.SLACK_WEBHOOK_URL, {
      channel: channel,
      text: text,
      blocks: blocks
    });
    
    // Log Slack message
    await db.query(
      `INSERT INTO slack_messages (agent_id, channel_id, message_type, message_content)
       VALUES ($1, $2, $3, $4)`,
      [agent_id, channel, message_type, JSON.stringify({ text, blocks })]
    );
    
    res.json({ success: true });
  } catch (err) {
    console.error('Slack error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 7. Get Agent Logs
app.get('/api/logs/:agent_id', async (req, res) => {
  const { agent_id } = req.params;
  const limit = req.query.limit || 50;
  
  try {
    const logs = await db.query(
      `SELECT * FROM agent_logs WHERE agent_id = $1 ORDER BY created_at DESC LIMIT $2`,
      [agent_id, limit]
    );
    res.json(logs.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== HELPER FUNCTIONS ====================

async function updateAgentMetrics(agent_id, agent_name, department) {
  const today = new Date().toISOString().split('T')[0];
  
  const existing = await db.query(
    `SELECT * FROM agent_metrics WHERE agent_id = $1 AND created_date = $2`,
    [agent_id, today]
  );
  
  if (existing.rows.length > 0) {
    await db.query(
      `UPDATE agent_metrics SET tasks_today = tasks_today + 1 WHERE agent_id = $1 AND created_date = $2`,
      [agent_id, today]
    );
  } else {
    await db.query(
      `INSERT INTO agent_metrics (agent_id, agent_name, department, tasks_today, created_date)
       VALUES ($1, $2, $3, 1, $4)`,
      [agent_id, agent_name, department, today]
    );
  }
}

async function calculateGlobalErrorRate() {
  const result = await db.query(
    `SELECT COUNT(*) as total, COUNT(CASE WHEN error_message IS NOT NULL THEN 1 END) as errors
     FROM agent_logs WHERE created_at > NOW() - INTERVAL '24 hours'`
  );
  const { total, errors } = result.rows[0];
  return total > 0 ? (errors / total * 100) : 0;
}

async function getAgentsByDepartment() {
  const result = await db.query(
    `SELECT department, COUNT(DISTINCT agent_id) as count, SUM(estimated_value_created) as value
     FROM agent_metrics WHERE created_date = CURRENT_DATE
     GROUP BY department`
  );
  return result.rows;
}

async function getActiveAlerts() {
  const result = await db.query(
    `SELECT agent_id, COUNT(*) as error_count
     FROM agent_logs WHERE created_at > NOW() - INTERVAL '1 hour' AND error_message IS NOT NULL
     GROUP BY agent_id HAVING COUNT(*) > 3`
  );
  return result.rows.map(r => ({
    type: 'error',
    message: `Agent ${r.agent_id} has ${r.error_count} errors in the last hour`,
    severity: r.error_count > 5 ? 'critical' : 'warning'
  }));
}

async function calculateUptime(agent_id) {
  const result = await db.query(
    `SELECT COUNT(*) as total, COUNT(CASE WHEN status = 'success' THEN 1 END) as successful
     FROM agent_logs WHERE agent_id = $1 AND created_at > NOW() - INTERVAL '7 days'`,
    [agent_id]
  );
  const { total, successful } = result.rows[0];
  return total > 0 ? ((successful / total) * 100).toFixed(1) : 100;
}

// ==================== SERVER START ====================

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Dashboard API running on port ${PORT}`);
  console.log(`📊 WebSocket events enabled`);
});
```

---

## Part 3: Frontend Dashboard (React + Next.js)

### Create Next.js App

```bash
npx create-next-app@latest mediabubble-dashboard --typescript --tailwind
cd mediabubble-dashboard
npm install socket.io-client recharts
```

### /app/page.tsx (Dashboard Overview)

```typescript
'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    fetchDashboardData();
    
    // WebSocket connection
    const socket = io(process.env.NEXT_PUBLIC_API_URL);
    socket.on('agent-update', (data) => {
      setStats(prev => ({
        ...prev,
        agents_by_department: prev?.agents_by_department.map(a => 
          a.id === data.agent_id ? { ...a, status: data.status } : a
        )
      }));
    });
    
    return () => socket.disconnect();
  }, []);

  const fetchDashboardData = async () => {
    const res = await fetch('/api/dashboard/overview');
    const data = await res.json();
    setStats(data);
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">MediaBubble AI Agents</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Active Agents</p>
          <p className="text-3xl font-bold">{stats?.active_agents}/45</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Error Rate</p>
          <p className="text-3xl font-bold">{stats?.error_rate}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Value Created Today</p>
          <p className="text-3xl font-bold">${(stats?.total_value_today || 0).toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Hours Saved Today</p>
          <p className="text-3xl font-bold">{(stats?.total_time_saved || 0).toFixed(1)}h</p>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">By Department</h2>
        <div className="space-y-4">
          {stats?.agents_by_department?.map((dept: any) => (
            <div key={dept.department} className="flex items-center justify-between">
              <span>{dept.department}</span>
              <div className="w-1/2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(dept.value / stats.total_value_today) * 100}%` }}
                />
              </div>
              <span className="ml-4">${(dept.value || 0).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Agents */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Top Agents Today</h2>
        <div className="space-y-3">
          {stats?.top_agents?.map((agent: any, idx: number) => (
            <div key={agent.agent_id} className="flex justify-between items-center border-b pb-3">
              <span>{idx + 1}. {agent.agent_name}</span>
              <span className="font-bold">${(agent.estimated_value_created || 0).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## Part 4: Agent Integration Code

### How Your Agents Call These APIs

```python
# Example: Lead Auto-Scorer Agent sends email + Slack notification

import requests
import json

class LeadAutoScorerAgent:
    def __init__(self):
        self.api_url = "https://api.mediabubble-ai.com"
        self.agent_id = "lead-auto-scorer"
    
    def score_lead(self, lead_data):
        # Score the lead using Claude
        score = self.claude_score(lead_data)
        
        # Log execution
        execution_time = 2.1  # seconds
        requests.post(
            f"{self.api_url}/api/agents/log",
            json={
                "agent_id": self.agent_id,
                "agent_name": "Lead Auto-Scorer",
                "department": "Lead Generation",
                "status": "success",
                "task_type": "lead_scoring",
                "execution_time_ms": int(execution_time * 1000),
                "output_data": {"score": score, "lead_id": lead_data['id']},
                "error_message": None
            }
        )
        
        # If high-quality lead, send email to sales
        if score > 80:
            requests.post(
                f"{self.api_url}/api/email/send",
                json={
                    "agent_id": self.agent_id,
                    "recipient_email": "sales@mediabubble.co",
                    "subject": f"🔥 Hot Lead: {lead_data['company']}",
                    "template": "lead-alert",
                    "email_type": "lead_alert",
                    "data": {
                        "score": score,
                        "company": lead_data['company'],
                        "contact": lead_data['contact'],
                        "budget": lead_data['budget']
                    }
                }
            )
            
            # Post to Slack
            requests.post(
                f"{self.api_url}/api/slack/post",
                json={
                    "agent_id": self.agent_id,
                    "channel": "#agents-leads",
                    "message_type": "lead_alert",
                    "text": f"🔥 Hot lead: {lead_data['company']} (Score: {score})",
                    "blocks": [
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": f"*🔥 HOT LEAD: {lead_data['company']}*\n*Score:* {score}\n*Contact:* {lead_data['contact']}\n*Budget:* ${lead_data['budget']}"
                            }
                        }
                    ]
                }
            )
        
        return score
```

---

## Deployment Checklist

- [ ] PostgreSQL database created & migrated
- [ ] SendGrid account configured with templates
- [ ] Slack bot created & installed to workspace
- [ ] Backend API deployed to Vercel/Railway
- [ ] Frontend dashboard deployed to Vercel
- [ ] Environment variables configured
- [ ] SSL certificate enabled
- [ ] Database backups configured
- [ ] Monitoring alerts set up
- [ ] Team trained on dashboard usage

---

**Status:** Ready to deploy
**Deployment time:** 1-2 hours
**Ongoing cost:** ~$64/month

