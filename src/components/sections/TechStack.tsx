'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Brain, Code2, Database, Cloud, Sparkles, Zap } from 'lucide-react'

// Tecnologías organizadas por categorías de IA primero
const technologies = {
  llms: {
    title: '🧠 Large Language Models (LLMs)',
    techs: [
      { name: 'GPT-4 Turbo', icon: '🤖', description: 'Razonamiento avanzado, análisis complejo' },
      { name: 'Claude 3.5 Sonnet', icon: '🧠', description: 'Precisión superior, contexto de 200K tokens' },
      { name: 'Gemini 1.5 Pro', icon: '⚡', description: 'Multimodal, procesamiento masivo de datos' },
      { name: 'Llama 3.1', icon: '🦙', description: 'Modelos open-source, customizables' },
      { name: 'Mixtral 8x7B', icon: '🔥', description: 'Mixture-of-Experts, eficiencia extrema' },
      { name: 'Command R+', icon: '📚', description: 'Especializado en RAG y búsqueda empresarial' },
    ],
  },
  frameworks: {
    title: '🔗 IA Frameworks & Orchestration',
    techs: [
      { name: 'LangChain / LangGraph', icon: '🦜', description: 'Orquestación de agentes IA complejos' },
      { name: 'LlamaIndex', icon: '🌊', description: 'RAG avanzado, búsqueda semántica' },
      { name: 'Semantic Kernel', icon: '🔧', description: 'Integración IA en aplicaciones enterprise' },
      { name: 'Haystack', icon: '⚙️', description: 'Pipelines IA para NLP y búsqueda' },
      { name: 'AutoGen', icon: '🎯', description: 'Agentes IA autónomos y conversacionales' },
      { name: 'CrewAI', icon: '🤖', description: 'Multi-agent systems para workflows complejos' },
    ],
  },
  vectorDB: {
    title: '🗄️ Vector Databases & Embeddings',
    techs: [
      { name: 'Pinecone', icon: '📍', description: 'Vector DB escalable, baja latencia' },
      { name: 'Qdrant', icon: '🔷', description: 'Open-source, alto rendimiento' },
      { name: 'Weaviate', icon: '🌟', description: 'Búsqueda semántica híbrida' },
      { name: 'Chroma', icon: '⚡', description: 'Embeddings optimizados para RAG' },
      { name: 'OpenAI Embeddings', icon: '🧮', description: 'Calidad superior, 3072 dimensiones' },
      { name: 'Cohere Embed v3', icon: '🎨', description: 'Multilingüe, contexto largo' },
    ],
  },
  generative: {
    title: '🎨 IA Generativa (Imagen, Audio, Video)',
    techs: [
      { name: 'DALL-E 3', icon: '🎨', description: 'Generación de imágenes fotorrealistas' },
      { name: 'Midjourney API', icon: '🖼️', description: 'Arte conceptual de alta calidad' },
      { name: 'Stable Diffusion XL', icon: '🎭', description: 'Control total, fine-tuning personalizado' },
      { name: 'ElevenLabs', icon: '🎵', description: 'Text-to-Speech ultra realista' },
      { name: 'Whisper', icon: '🎙️', description: 'Speech-to-Text multilingüe' },
      { name: 'RunwayML', icon: '🎬', description: 'Generación de video con IA' },
    ],
  },
  vision: {
    title: '🔍 Computer Vision & OCR',
    techs: [
      { name: 'GPT-4 Vision', icon: '👁️', description: 'Análisis visual avanzado' },
      { name: 'Claude 3.5 Vision', icon: '📸', description: 'Precisión en documentos complejos' },
      { name: 'Textract (AWS)', icon: '📄', description: 'OCR enterprise con layout detection' },
      { name: 'Azure Computer Vision', icon: '🔎', description: 'Análisis de imágenes y OCR' },
      { name: 'Donut', icon: '📋', description: 'Comprensión de documentos sin OCR' },
    ],
  },
  finetuning: {
    title: '🧪 Fine-tuning & Training',
    techs: [
      { name: 'LoRA / QLoRA', icon: '🔬', description: 'Fine-tuning eficiente de LLMs' },
      { name: 'PEFT', icon: '⚗️', description: 'Parameter-Efficient Fine-Tuning' },
      { name: 'Unsloth', icon: '🧬', description: 'Entrenamiento 2x más rápido' },
      { name: 'Axolotl', icon: '🎯', description: 'Pipeline completo de fine-tuning' },
      { name: 'LLaMA Factory', icon: '🔥', description: 'GUI para entrenar modelos localmente' },
    ],
  },
  mlops: {
    title: '⚙️ MLOps & Deployment',
    techs: [
      { name: 'AWS SageMaker', icon: '☁️', description: 'Entrenamiento y deploy escalable' },
      { name: 'Azure OpenAI Service', icon: '🔷', description: 'GPT-4 en tu infraestructura' },
      { name: 'Google Vertex AI', icon: '🌐', description: 'MLOps completo en GCP' },
      { name: 'Hugging Face Inference', icon: '📦', description: 'Deploy de modelos open-source' },
      { name: 'vLLM', icon: '🐳', description: 'Serving ultrarrápido de LLMs' },
      { name: 'Replicate', icon: '🚀', description: 'Deploy instant de modelos' },
    ],
  },
  security: {
    title: '🔐 IA Segura & Compliance',
    techs: [
      { name: 'Azure Content Safety', icon: '🛡️', description: 'Moderación de contenido IA' },
      { name: 'Lakera Guard', icon: '🔒', description: 'Protección contra prompt injection' },
      { name: 'Guardrails AI', icon: '🎯', description: 'Validación de outputs de LLMs' },
      { name: 'LangSmith', icon: '📋', description: 'Observabilidad y debugging de IA' },
    ],
  },
  development: {
    title: '💻 Development Stack (IA-Ready)',
    techs: [
      { name: 'React + Next.js 14', icon: '⚛️', description: 'Server Components para streaming' },
      { name: 'TypeScript', icon: '📘', description: 'Type safety para aplicaciones IA' },
      { name: 'Tailwind CSS', icon: '🎨', description: 'UI moderna y responsive' },
      { name: 'Vercel AI SDK', icon: '🔄', description: 'Streaming de LLMs' },
      { name: 'Python (FastAPI)', icon: '🐍', description: 'Backend para modelos IA' },
      { name: 'Node.js', icon: '🟢', description: 'APIs rápidas' },
      { name: 'PostgreSQL + pgvector', icon: '🐘', description: 'Búsqueda semántica' },
      { name: 'MongoDB', icon: '🍃', description: 'Datos no estructurados' },
      { name: 'Redis', icon: '🔴', description: 'Caché de embeddings' },
      { name: 'Docker + Kubernetes', icon: '🐳', description: 'Orquestación y escalado' },
    ],
  },
}

const categoryIcons: Record<string, any> = {
  llms: Brain,
  frameworks: Sparkles,
  vectorDB: Database,
  generative: Sparkles,
  vision: Zap,
  finetuning: Brain,
  mlops: Cloud,
  security: Sparkles,
  development: Code2,
}

interface TechCardProps {
  tech: { name: string; icon: string; description: string }
  index: number
}

function TechCard({ tech, index }: TechCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="group p-6 bg-background-secondary backdrop-blur-sm rounded-xl border border-foreground/10 hover:border-accent-orange-500/50 transition-all duration-300 cursor-pointer hover:shadow-glow-orange"
    >
      <div className="flex flex-col items-center gap-3">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 flex items-center justify-center text-4xl"
        >
          {tech.icon}
        </motion.div>
        <div className="text-center">
          <span className="text-sm font-semibold text-foreground group-hover:text-accent-orange-400 transition-colors block mb-1">
            {tech.name}
          </span>
          <span className="text-xs text-foreground-muted">
            {tech.description}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-background-secondary to-background"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground">
            Tecnología de <span className="text-gradient">IA de vanguardia</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto">
            No usamos IA genérica. Trabajamos con los modelos más avanzados, técnicas de fine-tuning propietarias y arquitecturas optimizadas para tu caso de uso específico.
          </p>
        </motion.div>

        <div className="space-y-12 lg:space-y-16">
          {Object.entries(technologies).map(([category, data], catIndex) => {
            const CategoryIcon = categoryIcons[category] || Brain
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <CategoryIcon className="w-6 h-6 text-accent-orange-500" />
                  <h3 className="text-2xl font-display font-bold text-foreground">
                    {data.title}
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {data.techs.map((tech, index) => (
                    <TechCard key={tech.name} tech={tech} index={index} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Sección de técnicas avanzadas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 lg:mt-20"
        >
          <h3 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
            🔬 Técnicas Avanzadas que Dominamos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              'RAG (Retrieval-Augmented Generation)',
              'Fine-tuning de Modelos',
              'Multi-Agent Systems',
              'Prompt Engineering Avanzado',
              'Function Calling / Tool Use',
              'Streaming & Real-time',
              'Embeddings Customizados',
              'Cost Optimization',
            ].map((technique, index) => (
              <motion.div
                key={technique}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                className="px-4 py-3 bg-background-secondary rounded-lg border border-foreground/10 text-center text-sm font-medium text-foreground hover:border-accent-orange-500/50 transition-colors"
              >
                ✅ {technique}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
