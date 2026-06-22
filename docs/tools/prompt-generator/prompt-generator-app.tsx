'use client';

import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, RefreshCw, Download, Lightbulb } from 'lucide-react';

/**
 * MEDIABUBBLE ADVANCED PROMPT GENERATOR
 *
 * Production-ready component with:
 * - 3-pane responsive layout (Desktop → Tablet → Mobile)
 * - Visual Prompt Anatomy & Interactive Chips
 * - Real-time Prompt Strength Score (0-100)
 * - Premium spacing & dark mode support
 * - Keyboard shortcuts & accessibility
 */

interface PromptElement {
  id: string;
  icon: string;
  label: string;
  category: 'subject' | 'camera' | 'lighting' | 'brand' | 'safezones' | 'mood';
  value: string;
}

interface PromptData {
  subject: string;
  camera: string;
  lighting: string;
  brandDNA: string;
  brandColor: string;
  brandIntensity: number;
  safeZones: boolean;
  safeZoneTop: number;
  safeZoneBottom: number;
  mood: string;
  mode: 'image' | 'video';
  fullPrompt: string;
}

interface FormState {
  mode: 'image' | 'video';
  imageStyle: string;
  subject: string;
  cameraSpecs: string;
  lightingStyle: string;
  brandColor: string;
  brandIntensity: number;
  useSafeZones: boolean;
  safeZoneTop: number;
  safeZoneBottom: number;
  moodStyle: string;
}

/**
 * HEADER COMPONENT
 */
function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur-sm flex items-center px-8">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">MB</span>
          </div>
          <h1 className="text-lg font-semibold text-foreground">Advanced Prompt Generator</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Presets
          </button>
          <button className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Help
          </button>
        </div>
      </div>
    </header>
  );
}

/**
 * LEFT PANE: SETTINGS PANEL
 */
function LeftSettingsPane({
  formData,
  setFormData,
  isGenerating,
  onGenerate,
}: {
  formData: FormState;
  setFormData: (data: FormState) => void;
  isGenerating: boolean;
  onGenerate: () => Promise<void>;
}) {
  return (
    <div className="flex flex-col h-full bg-card">
      {/* Mode Selector */}
      <div className="sticky top-0 z-10 p-6 pb-4 border-b border-border bg-card">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Generate</h2>
        <Tabs value={formData.mode} onValueChange={(val) =>
          setFormData({ ...formData, mode: val as 'image' | 'video' })
        }>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Scrollable Settings */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <Accordion type="single" collapsible defaultValue="basic">
            {/* BASIC SETTINGS */}
            <AccordionItem value="basic" className="border-b border-border/50">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
                Basic Settings
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Portrait of a woman in studio lighting"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="border-border focus:ring-blue-500/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Describe the main subject of your {formData.mode}.
                  </p>
                </div>

                {formData.mode === 'image' && (
                  <div className="space-y-2">
                    <Label htmlFor="style" className="text-sm font-medium">
                      Visual Style
                    </Label>
                    <Select value={formData.imageStyle} onValueChange={(val) =>
                      setFormData({ ...formData, imageStyle: val })
                    }>
                      <SelectTrigger className="border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photorealistic">Photorealistic</SelectItem>
                        <SelectItem value="cinematic">Cinematic</SelectItem>
                        <SelectItem value="illustration">Illustration</SelectItem>
                        <SelectItem value="3d">3D Render</SelectItem>
                        <SelectItem value="conceptart">Concept Art</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* CAMERA & TECHNICAL */}
            <AccordionItem value="camera" className="border-b border-border/50">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
                📷 Camera & Technical
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="camera" className="text-sm font-medium">
                    Lens & Aperture
                  </Label>
                  <Input
                    id="camera"
                    placeholder="e.g., 85mm f/1.8"
                    value={formData.cameraSpecs}
                    onChange={(e) => setFormData({ ...formData, cameraSpecs: e.target.value })}
                    className="border-border focus:ring-blue-500/50 font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Suggested: 35mm f/1.4, 50mm f/1.8, 85mm f/1.8, 135mm f/2.0
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* LIGHTING & MOOD */}
            <AccordionItem value="lighting" className="border-b border-border/50">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
                💡 Lighting & Mood
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="lighting" className="text-sm font-medium">
                    Lighting Style
                  </Label>
                  <Input
                    id="lighting"
                    placeholder="e.g., Rembrandt, Golden Hour, Studio"
                    value={formData.lightingStyle}
                    onChange={(e) => setFormData({ ...formData, lightingStyle: e.target.value })}
                    className="border-border focus:ring-blue-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mood" className="text-sm font-medium">
                    Mood & Atmosphere
                  </Label>
                  <Input
                    id="mood"
                    placeholder="e.g., Dramatic, Serene, Energetic"
                    value={formData.moodStyle}
                    onChange={(e) => setFormData({ ...formData, moodStyle: e.target.value })}
                    className="border-border focus:ring-blue-500/50"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* BRAND DNA */}
            <AccordionItem value="brand" className="border-b border-border/50">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
                🎨 Brand DNA
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="brandColor" className="text-sm font-medium">
                    Primary Brand Color
                  </Label>
                  <div className="flex gap-3 items-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className="w-10 h-10 rounded-md border border-border cursor-pointer hover:shadow-md transition-shadow"
                          style={{ backgroundColor: formData.brandColor }}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-2">
                          <Label htmlFor="colorInput" className="text-sm">
                            Enter hex color
                          </Label>
                          <Input
                            id="colorInput"
                            type="text"
                            placeholder="#003366"
                            value={formData.brandColor}
                            onChange={(e) => setFormData({ ...formData, brandColor: e.target.value })}
                            className="font-mono"
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="text"
                      placeholder="#003366"
                      value={formData.brandColor}
                      className="flex-1 font-mono text-sm border-border"
                      onChange={(e) => setFormData({ ...formData, brandColor: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="brandIntensity" className="text-sm font-medium">
                      Brand Integration
                    </Label>
                    <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
                      {formData.brandIntensity}%
                    </span>
                  </div>
                  <Slider
                    value={[formData.brandIntensity]}
                    onValueChange={(value) => setFormData({ ...formData, brandIntensity: value[0] })}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    How prominently should brand colors appear?
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SAFE ZONES */}
            <AccordionItem value="safezones" className="border-b border-border/50">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
                🛡️ Safe Zones (Text Overlay)
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="useSafeZones"
                    checked={formData.useSafeZones}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, useSafeZones: !!checked })
                    }
                  />
                  <Label htmlFor="useSafeZones" className="text-sm cursor-pointer">
                    Enable Safe Zones
                  </Label>
                </div>

                {formData.useSafeZones && (
                  <div className="space-y-4 p-3 bg-muted/50 rounded-lg border border-border/50">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs text-muted-foreground">
                          Top Safe Zone
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          {formData.safeZoneTop}%
                        </span>
                      </div>
                      <Slider
                        value={[formData.safeZoneTop]}
                        onValueChange={(value) =>
                          setFormData({ ...formData, safeZoneTop: value[0] })
                        }
                        min={0}
                        max={50}
                        step={5}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs text-muted-foreground">
                          Bottom Safe Zone
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          {formData.safeZoneBottom}%
                        </span>
                      </div>
                      <Slider
                        value={[formData.safeZoneBottom]}
                        onValueChange={(value) =>
                          setFormData({ ...formData, safeZoneBottom: value[0] })
                        }
                        min={0}
                        max={50}
                        step={5}
                      />
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Sticky Generate Button */}
      <div className="sticky bottom-0 p-6 border-t border-border bg-card">
        <Button
          onClick={onGenerate}
          disabled={isGenerating || !formData.subject}
          size="lg"
          className={cn(
            'w-full font-semibold transition-all',
            isGenerating && 'opacity-90'
          )}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating...
            </>
          ) : (
            'Generate Prompt'
          )}
        </Button>
      </div>
    </div>
  );
}

/**
 * CENTER PANE: PREVIEW/CANVAS
 */
function CenterPreviewPane({ mode }: { mode: 'image' | 'video' }) {
  return (
    <main className="col-span-6 border-r border-border bg-background overflow-hidden flex items-center justify-center p-8">
      <div className="w-full h-full bg-muted rounded-lg border border-border flex flex-col items-center justify-center text-center gap-4">
        <div className="text-6xl opacity-30">
          {mode === 'image' ? '🖼️' : '🎬'}
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">
            {mode === 'image'
              ? 'Image preview will appear here'
              : 'Video preview will appear here'}
          </p>
          <p className="text-xs text-muted-foreground/60">
            Configure settings and click "Generate" to see a preview
          </p>
        </div>
      </div>
    </main>
  );
}

/**
 * PROMPT CHIPS - Interactive Elements
 */
function ChipButton({
  element,
  index,
  onEdit,
}: {
  element: PromptElement;
  index: number;
  onEdit: () => void;
}) {
  const categoryColors = {
    subject: 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200',
    camera: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200',
    lighting: 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200',
    brand: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-200',
    safezones: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-800 text-green-900 dark:text-green-200',
    mood: 'bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-800 text-pink-900 dark:text-pink-200',
  };

  return (
    <button
      onClick={onEdit}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2 rounded-full',
        'border transition-all cursor-pointer',
        'hover:shadow-md hover:scale-105',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'animate-in fade-in slide-in-from-left-2',
        categoryColors[element.category]
      )}
      style={{
        animationDelay: `${index * 50}ms`,
        animationDuration: '0.3s',
      }}
    >
      <span className="text-base">{element.icon}</span>
      <span className="text-sm font-medium truncate max-w-[120px]">{element.label}</span>
      <span className="text-xs opacity-70">✎</span>
    </button>
  );
}

/**
 * RIGHT PANE: OUTPUT PANEL WITH VISUAL ANATOMY
 */
function RightOutputPane({ promptData }: { promptData: PromptData | null }) {
  const [copiedElement, setCopiedElement] = useState<string | null>(null);
  const [editingChip, setEditingChip] = useState<string | null>(null);

  // Calculate prompt strength score
  const score = useMemo(() => {
    if (!promptData) return 0;
    let baseScore = 50;
    if (promptData.camera) baseScore += 10;
    if (promptData.lighting) baseScore += 10;
    if (promptData.brandDNA) baseScore += 10;
    if (promptData.safeZones) baseScore += 10;
    if (promptData.mood) baseScore += 10;
    return Math.min(baseScore, 100);
  }, [promptData]);

  const scoreColor = score >= 90 ? '#10b981' : score >= 70 ? '#3b82f6' : '#f59e0b';

  // Build prompt elements
  const promptElements: PromptElement[] = [];
  if (promptData) {
    if (promptData.subject)
      promptElements.push({
        id: 'subject',
        icon: '📝',
        label: promptData.subject.substring(0, 30),
        category: 'subject',
        value: promptData.subject,
      });
    if (promptData.camera)
      promptElements.push({
        id: 'camera',
        icon: '📷',
        label: promptData.camera,
        category: 'camera',
        value: promptData.camera,
      });
    if (promptData.lighting)
      promptElements.push({
        id: 'lighting',
        icon: '💡',
        label: promptData.lighting,
        category: 'lighting',
        value: promptData.lighting,
      });
    if (promptData.brandDNA)
      promptElements.push({
        id: 'brand',
        icon: '🎨',
        label: 'Brand DNA',
        category: 'brand',
        value: promptData.brandDNA,
      });
    if (promptData.safeZones)
      promptElements.push({
        id: 'safezones',
        icon: '🛡️',
        label: 'Safe Zones',
        category: 'safezones',
        value: `Top: ${promptData.safeZoneTop}%, Bottom: ${promptData.safeZoneBottom}%`,
      });
    if (promptData.mood)
      promptElements.push({
        id: 'mood',
        icon: '✨',
        label: promptData.mood,
        category: 'mood',
        value: promptData.mood,
      });
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedElement('full');
      setTimeout(() => setCopiedElement(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  if (!promptData) {
    return (
      <aside className="col-span-3 border-l border-border bg-card overflow-y-auto flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="text-5xl opacity-20">✨</div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Generate a prompt to see the visual breakdown here.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Configure your settings on the left and click Generate.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="col-span-3 border-l border-border bg-card overflow-y-auto flex flex-col h-full">
      {/* Prompt Strength Score Section */}
      <div className="sticky top-0 z-10 p-6 pb-4 border-b border-border bg-card space-y-4">
        {/* Circular Score */}
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-3">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted-foreground/20"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={scoreColor}
                strokeWidth="2"
                strokeDasharray={`${2.827 * score} 282.7`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: scoreColor }}>
                {score}
              </span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Prompt Strength Score
          </p>
        </div>

        {/* Quality Checklist */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">
            Quality Checklist
          </h4>
          <div className="space-y-1">
            {[
              { name: 'Camera Specs', present: !!promptData.camera },
              { name: 'Lighting', present: !!promptData.lighting },
              { name: 'Brand DNA', present: !!promptData.brandDNA },
              { name: 'Mood', present: !!promptData.mood },
              { name: 'Safe Zones', present: promptData.safeZones },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-2 rounded hover:bg-accent/50 text-sm transition-colors"
              >
                <span className={item.present ? 'text-green-600' : 'text-amber-600'}>
                  {item.present ? '✓' : '○'}
                </span>
                <span className="text-xs text-foreground flex-1 ml-2">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestion */}
        {score < 90 && (
          <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
            <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-xs text-blue-900 dark:text-blue-200 ml-2">
              Add more details to improve coherence and specificity.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Prompt Anatomy Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Interactive Chips */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
              Prompt Elements
            </h3>
            <div className="flex flex-wrap gap-3">
              {promptElements.map((element, index) => (
                <ChipButton
                  key={element.id}
                  element={element}
                  index={index}
                  onEdit={() => setEditingChip(element.id)}
                />
              ))}
            </div>
          </div>

          {/* Full Prompt Text */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
              Full Prompt Text
            </h3>
            <div className="p-4 bg-muted rounded-lg border border-border">
              <p className="text-sm text-foreground leading-relaxed font-mono whitespace-pre-wrap break-words">
                {promptData.fullPrompt || 'Prompt text will appear here...'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Actions */}
      <div className="sticky bottom-0 p-6 border-t border-border bg-card flex gap-3">
        <Button
          variant="default"
          size="sm"
          className="flex-1 gap-2"
          onClick={() => copyToClipboard(promptData.fullPrompt)}
        >
          <Copy className="h-4 w-4" />
          {copiedElement === 'full' ? 'Copied!' : 'Copy'}
        </Button>
        <Button variant="outline" size="sm" className="flex-1 gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </aside>
  );
}

/**
 * MAIN COMPONENT
 */
export default function PromptGenerator() {
  const [formData, setFormData] = useState<FormState>({
    mode: 'image',
    imageStyle: 'photorealistic',
    subject: '',
    cameraSpecs: '85mm f/1.8',
    lightingStyle: 'Rembrandt',
    brandColor: '#003366',
    brandIntensity: 50,
    useSafeZones: true,
    safeZoneTop: 15,
    safeZoneBottom: 15,
    moodStyle: '',
  });

  const [promptData, setPromptData] = useState<PromptData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Build full prompt
      const fullPrompt = [
        formData.subject,
        formData.cameraSpecs && `Shot on ${formData.cameraSpecs}`,
        formData.lightingStyle && `Lighting: ${formData.lightingStyle}`,
        formData.brandColor && `Brand color: ${formData.brandColor}`,
        formData.useSafeZones &&
          `Safe zones: Top ${formData.safeZoneTop}%, Bottom ${formData.safeZoneBottom}%`,
        formData.moodStyle && `Mood: ${formData.moodStyle}`,
        `Ultra high quality, professional, cinematic composition`,
      ]
        .filter(Boolean)
        .join('. ');

      setPromptData({
        subject: formData.subject,
        camera: formData.cameraSpecs,
        lighting: formData.lightingStyle,
        brandDNA: `${formData.brandColor} at ${formData.brandIntensity}%`,
        brandColor: formData.brandColor,
        brandIntensity: formData.brandIntensity,
        safeZones: formData.useSafeZones,
        safeZoneTop: formData.safeZoneTop,
        safeZoneBottom: formData.safeZoneBottom,
        mood: formData.moodStyle,
        mode: formData.mode,
        fullPrompt,
      });
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Enter: Generate
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isGenerating && formData.subject) {
          handleGenerate();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGenerating, formData]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <Header />

      {/* Main 3-Pane Layout (Desktop) */}
      <div className="hidden lg:flex flex-1 gap-0 overflow-hidden">
        {/* Left Pane */}
        <div className="w-1/4 min-w-0">
          <LeftSettingsPane
            formData={formData}
            setFormData={setFormData}
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
          />
        </div>

        {/* Center Pane */}
        <div className="flex-1 min-w-0">
          <CenterPreviewPane mode={formData.mode} />
        </div>

        {/* Right Pane */}
        <div className="w-1/4 min-w-0">
          <RightOutputPane promptData={promptData} />
        </div>
      </div>

      {/* Mobile/Tablet Fallback */}
      <div className="lg:hidden flex-1 overflow-y-auto">
        <Tabs defaultValue="settings" className="w-full h-full flex flex-col">
          <TabsList className="w-full grid grid-cols-3 rounded-none sticky top-0 z-10">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="settings" className="mt-0">
              <LeftSettingsPane
                formData={formData}
                setFormData={setFormData}
                isGenerating={isGenerating}
                onGenerate={handleGenerate}
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-0">
              <CenterPreviewPane mode={formData.mode} />
            </TabsContent>
            <TabsContent value="output" className="mt-0">
              <RightOutputPane promptData={promptData} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
