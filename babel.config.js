module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['import', { libraryName: 'antd', style: true }],
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        displayName: true,
        fileName: true,
        namespace: 'FLAIRVERSE',
      },
    ],
  ],
}
