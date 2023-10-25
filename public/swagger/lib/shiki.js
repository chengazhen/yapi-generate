shiki
  .getHighlighter({
    theme: 'slack-dark',
    langs: ['js'],
  })
  .then(highlighter => {
    Window.highlighter = highlighter
    console.log(Window.highlighter);
  })