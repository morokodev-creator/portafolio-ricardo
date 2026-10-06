import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Proyectos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Proyecto',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'Inglés', type: 'string' }
      ]
    }),
    defineField({
      name: 'client',
      title: 'Cliente / Empresa (ej. Claro)',
      type: 'string',
    }),
    // NUEVO CAMPO: SLUG PARA LA URL
    defineField({
      name: 'slug',
      title: 'URL del Proyecto (Slug)',
      type: 'slug',
      options: {
        source: 'client', // Genera la URL basado en el nombre del cliente
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Tu Rol',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'Inglés', type: 'string' }
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Imágenes',
      description: 'Puedes agregar múltiples imágenes aquí.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    }),
    defineField({
      name: 'problem',
      title: 'El Problema',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'text' },
        { name: 'en', title: 'Inglés', type: 'text' }
      ]
    }),
    defineField({
      name: 'solution',
      title: 'La Solución',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'text' },
        { name: 'en', title: 'Inglés', type: 'text' }
      ]
    }),
    defineField({
      name: 'metrics',
      title: 'Métricas de Éxito',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Métrica (ej. Incremento de leads)',
              type: 'object',
              fields: [
                { name: 'es', title: 'Español', type: 'string' },
                { name: 'en', title: 'Inglés', type: 'string' }
              ]
            },
            { name: 'value', title: 'Valor Numérico (ej. 30% o 5 min)', type: 'string' }
          ]
        }
      ]
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonio / Testimonial',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'text', description: 'Testimonio del usuario o cliente en español.' },
        { name: 'en', title: 'Inglés', type: 'text', description: 'User or client testimonial in English.' }
      ]
    })
  ],
})