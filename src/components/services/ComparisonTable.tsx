'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface ComparisonValue {
  value: string
  color: 'green' | 'orange' | 'yellow' | 'red'
  note?: string
}

interface ComparisonRow {
  feature: string
  native: ComparisonValue
  hybrid: ComparisonValue
  pwa: ComparisonValue
}

interface Recommendation {
  type: string
  when: string
  examples: string
}

interface ComparisonTableProps {
  title: string
  description: string
  comparison: {
    headers: string[]
    rows: ComparisonRow[]
    recommendations: Recommendation[]
  }
}

const colorClasses = {
  green: 'text-green-500',
  orange: 'text-orange-500',
  yellow: 'text-yellow-500',
  red: 'text-red-500',
}

export function ComparisonTable({ title, description, comparison }: ComparisonTableProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {title}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Table */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  {comparison.headers[0]}
                </th>
                {comparison.headers.slice(1).map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-center text-sm font-semibold text-gray-300"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-medium">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div>
                      <div className={colorClasses[row.native.color]}>
                        {row.native.value}
                      </div>
                      {row.native.note && (
                        <p className="text-xs text-gray-500 mt-1">
                          {row.native.note}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div>
                      <div className={colorClasses[row.hybrid.color]}>
                        {row.hybrid.value}
                      </div>
                      {row.hybrid.note && (
                        <p className="text-xs text-gray-500 mt-1">
                          {row.hybrid.note}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div>
                      <div className={colorClasses[row.pwa.color]}>
                        {row.pwa.value}
                      </div>
                      {row.pwa.note && (
                        <p className="text-xs text-gray-500 mt-1">
                          {row.pwa.note}
                        </p>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recommendations */}
        <div className="grid md:grid-cols-3 gap-6">
          {comparison.recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: comparison.rows.length * 0.05 + index * 0.1 }}
              className="p-6 bg-gray-900 rounded-xl border border-gray-800"
            >
              <h3 className="text-xl font-bold text-accent-orange-500 mb-3">
                {rec.type}
              </h3>
              <p className="text-gray-300 mb-4">
                <strong className="text-white">Cuándo:</strong> {rec.when}
              </p>
              <p className="text-gray-400 text-sm">
                <strong className="text-gray-300">Ejemplos:</strong> {rec.examples}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
