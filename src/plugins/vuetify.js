// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VDataTable } from 'vuetify/labs/VDataTable'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  components: {
    VDataTable,
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          error: '#F44336',
        }
      },
    },
  },
})
