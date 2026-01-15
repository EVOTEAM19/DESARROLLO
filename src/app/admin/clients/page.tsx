'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@/lib/supabase'
import { Plus, Edit, Trash2, Eye, EyeOff, Power } from 'lucide-react'

interface Client {
  id: string
  name: string
  logo_url: string
  website?: string
  industry?: string
  featured: boolean
  order_index: number
  published: boolean
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [sectionEnabled, setSectionEnabled] = useState(true)
  const [loadingToggle, setLoadingToggle] = useState(false)
  const supabase = createBrowserClient()

  useEffect(() => {
    fetchClients()
    fetchSectionSetting()
  }, [])

  async function fetchSectionSetting() {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('section', 'general')
        .eq('key', 'clients_section_enabled')
        .single()

      if (!error && data) {
        let enabled = true
        try {
          enabled = typeof data.value === 'string' 
            ? JSON.parse(data.value) 
            : data.value ?? true
        } catch {
          enabled = data.value ?? true
        }
        setSectionEnabled(enabled)
      } else {
        // Si no existe la configuración, por defecto está habilitada
        setSectionEnabled(true)
      }
    } catch (err) {
      console.error('Error fetching section setting:', err)
    }
  }

  async function toggleSectionEnabled() {
    try {
      setLoadingToggle(true)
      const newValue = !sectionEnabled
      
      const { error } = await supabase
        .from('site_settings')
        .upsert(
          {
            section: 'general',
            key: 'clients_section_enabled',
            value: JSON.stringify(newValue),
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'section,key' }
        )

      if (error) {
        throw error
      }

      setSectionEnabled(newValue)
      alert(newValue 
        ? 'Sección de clientes activada. Ahora se mostrará en la web.' 
        : 'Sección de clientes desactivada. Ya no se mostrará en la web.'
      )
    } catch (err: any) {
      console.error('Error toggling section:', err)
      alert('Error al actualizar la configuración: ' + (err.message || 'Error desconocido'))
    } finally {
      setLoadingToggle(false)
    }
  }

  async function fetchClients() {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('order_index', { ascending: true })
      
      if (data && !error) {
        setClients(data)
      }
    } catch (err) {
      console.error('Error fetching clients:', err)
    } finally {
      setLoading(false)
    }
  }

  async function togglePublished(clientId: string, currentStatus: boolean) {
    const { error } = await supabase
      .from('clients')
      .update({ published: !currentStatus })
      .eq('id', clientId)
    
    if (!error) {
      fetchClients()
    } else {
      alert('Error al actualizar: ' + error.message)
    }
  }

  async function deleteClient(clientId: string) {
    if (!confirm('¿Eliminar este cliente?')) return
    
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', clientId)
    
    if (!error) {
      fetchClients()
    } else {
      alert('Error al eliminar: ' + error.message)
    }
  }

  async function saveClient(formData: FormData) {
    const clientData = {
      name: formData.get('name') as string,
      logo_url: formData.get('logo_url') as string,
      website: formData.get('website') as string || null,
      industry: formData.get('industry') as string || null,
      featured: formData.get('featured') === 'on',
      order_index: parseInt(formData.get('order_index') as string) || 0,
      published: formData.get('published') === 'on'
    }

    try {
      if (editingClient) {
        // Update
        const { error } = await supabase
          .from('clients')
          .update(clientData)
          .eq('id', editingClient.id)
        
        if (error) throw error
      } else {
        // Create
        const { error } = await supabase
          .from('clients')
          .insert(clientData)
        
        if (error) throw error
      }
      
      setShowModal(false)
      setEditingClient(null)
      fetchClients()
    } catch (err: any) {
      alert('Error al guardar: ' + (err.message || 'Error desconocido'))
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gestión de Clientes</h1>
            <p className="text-gray-400">Gestiona los logos que aparecen en la web</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Toggle para activar/desactivar la sección */}
            <button
              onClick={toggleSectionEnabled}
              disabled={loadingToggle}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
                sectionEnabled
                  ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/30'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600 border border-gray-600'
              }`}
              title={sectionEnabled ? 'Clic para desactivar la sección en la web' : 'Clic para activar la sección en la web'}
            >
              <Power className={`w-5 h-5 ${sectionEnabled ? '' : 'opacity-50'}`} />
              {sectionEnabled ? 'Sección Visible' : 'Sección Oculta'}
            </button>
            <button
              onClick={() => {
                setEditingClient(null)
                setShowModal(true)
              }}
              className="flex items-center gap-2 px-6 py-3 bg-accent-orange-500 hover:bg-accent-orange-600 text-white rounded-lg font-semibold transition-colors"
            >
              <Plus className="w-5 h-5" />
              Añadir Cliente
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Cargando...</div>
        ) : (
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Orden</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Logo</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Nombre</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Industria</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Website</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {clients.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                        No hay clientes. Añade el primero.
                      </td>
                    </tr>
                  ) : (
                    clients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 text-gray-300">{client.order_index}</td>
                        <td className="px-6 py-4">
                          <div className="relative h-8 w-16">
                            <img
                              src={client.logo_url}
                              alt={client.name}
                              className="h-8 w-auto object-contain filter grayscale"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder-logo.svg'
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white font-medium">{client.name}</td>
                        <td className="px-6 py-4 text-gray-400">{client.industry || '-'}</td>
                        <td className="px-6 py-4">
                          {client.website ? (
                            <a
                              href={client.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-orange-500 hover:text-accent-orange-400"
                            >
                              Ver →
                            </a>
                          ) : (
                            <span className="text-gray-600">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => togglePublished(client.id, client.published)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ${
                              client.published
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-gray-700 text-gray-400'
                            }`}
                          >
                            {client.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            {client.published ? 'Visible' : 'Oculto'}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingClient(client)
                                setShowModal(true)
                              }}
                              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit className="w-4 h-4 text-gray-400" />
                            </button>
                            <button
                              onClick={() => deleteClient(client.id)}
                              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowModal(false)
              setEditingClient(null)
            }}
          >
            <div 
              className="bg-gray-800 rounded-xl border border-gray-700 p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
              </h2>
              
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  saveClient(new FormData(e.currentTarget))
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingClient?.name}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-accent-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL del Logo *
                  </label>
                  <input
                    type="url"
                    name="logo_url"
                    defaultValue={editingClient?.logo_url}
                    required
                    placeholder="https://example.com/logo.svg o /logos/logo.svg"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-accent-orange-500 focus:outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Sube el logo a /public/logos/ o usa una URL externa
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    defaultValue={editingClient?.website || ''}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-accent-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Industria
                  </label>
                  <input
                    type="text"
                    name="industry"
                    defaultValue={editingClient?.industry || ''}
                    placeholder="Ej: Banca, Retail, Telecomunicaciones"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-accent-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Orden de aparición
                  </label>
                  <input
                    type="number"
                    name="order_index"
                    defaultValue={editingClient?.order_index || 0}
                    min="0"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-accent-orange-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      defaultChecked={editingClient?.featured}
                      className="w-5 h-5 rounded border-gray-700 bg-gray-900 text-accent-orange-500 focus:ring-accent-orange-500"
                    />
                    <span className="text-gray-300">Destacado</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="published"
                      defaultChecked={editingClient?.published ?? true}
                      className="w-5 h-5 rounded border-gray-700 bg-gray-900 text-accent-orange-500 focus:ring-accent-orange-500"
                    />
                    <span className="text-gray-300">Publicado</span>
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      setEditingClient(null)
                    }}
                    className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-accent-orange-500 hover:bg-accent-orange-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    {editingClient ? 'Guardar Cambios' : 'Crear Cliente'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
