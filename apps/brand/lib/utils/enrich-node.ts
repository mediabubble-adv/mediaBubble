import { type SkillNode } from '@/lib/data/arabic-taxonomy'
import { branchAgents, subBranchAgents, leafSkills, type AgentInfo } from '@/lib/data/arabic-agents'

export function getAgent(node: SkillNode): AgentInfo | undefined {
  if (leafSkills[node.id]) {
    return {
      agent: leafSkills[node.id].agent,
      agentAr: leafSkills[node.id].agentAr,
      description: subBranchAgents[node.id]?.description ?? branchAgents[node.id.split('.')[0]]?.description ?? '',
    }
  }
  if (subBranchAgents[node.id]) return subBranchAgents[node.id]
  const branchId = node.id.split('.')[0]
  if (branchAgents[branchId]) return branchAgents[branchId]
  return undefined
}

export function getSkills(node: SkillNode): string[] {
  return leafSkills[node.id]?.skills ?? []
}

export function enrichNode(node: SkillNode): SkillNode & { agent?: string; agentAr?: string; skills?: string[] } {
  const agent = getAgent(node)
  const skills = getSkills(node)
  return {
    ...node,
    agent: agent?.agent,
    agentAr: agent?.agentAr,
    skills: skills.length > 0 ? skills : undefined,
  }
}
