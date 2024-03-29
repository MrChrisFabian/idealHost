import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'MrChrisFabian/idealHost',
  },
  //Puedo cambiar la ui del admin mode con ui:{}
  ui: {
    brand: {
      name: 'Ideal Admin',

    }
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'src/assets/images/posts',
            publicPath: '../../assets/images/posts/',
          },
        }),
        authors: fields.array(fields.relationship({
          label: 'Authors',
          collection: 'authors',
          validation: {
            isRequired: true
          },
        }),
          {
            label: 'Authors',
            itemLabel: (item) => item.value || "Please select a author"
          })
      },
    }),
    authors: collection({
      label: 'Authors',
      slugField: 'name',
      path: 'src/content/authors/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'public/images/avatars',
          publicPath: '/images/avatars',
        }),
        showcase: fields.blocks(
          { link: { label: 'Link', schema: fields.object({ label: fields.text({ label: 'Label', validation: { length: { min: 1, } } }), url: fields.url({ label: 'URL' }) }), itemLabel: (item) => { return item.fields.label.value; } } },
          { label: 'Tus links' })
      }
    }),
  },
});
