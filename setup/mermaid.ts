import { defineMermaidSetup } from '@slidev/types'

// Paleta del template: nodos Charcoal sobre el fondo azul, borde naranja, líneas blancas.
export default defineMermaidSetup(() => ({
  theme: 'base',
  themeVariables: {
    fontFamily: 'Amazon Ember, Chivo, sans-serif',
    primaryColor: '#172033',
    primaryTextColor: '#ffffff',
    primaryBorderColor: '#ff9900',
    lineColor: '#ffffff',
    secondaryColor: '#172033',
    tertiaryColor: '#172033',
    edgeLabelBackground: '#172033',
    clusterBkg: 'rgba(10,18,48,.55)',
    clusterBorder: '#b3b3b3',
    titleColor: '#ffffff',
  },
}))
