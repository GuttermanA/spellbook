export const API_ROOT = 'http://localhost:3000'

export const archtypeOptions = [
  {key: 'Aggro', text: 'Aggro', value: 'Aggro'},
  {key: 'Control', text: 'Control', value: 'Control'},
  {key: 'Midrange', text: 'Midrange', value: 'Midrange'},
  {key: 'Tribal', text: 'Tribal', value: 'Tribal'},
  {key: 'Tempo', text: 'Tempo', value: 'Tempo'},
  {key: 'Combo', text: 'Combo', value: 'Combo'},
  {key: 'Ramp', text: 'Ramp', value: 'Ramp'},
]

export const archtypeRenderLabel = (label) => ({
  color: 'blue',
  content: label.text,
  icon: 'check',
})
