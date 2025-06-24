

<script>

    const text = `Aqui está um exemplo de uso:
    ```
    npm install -g nuxt
    ```
    E o restante do conteúdo.
    `
    function formatCodeBlocks(input: string): string {
  return input.replace(/```(.*?)\n([\s\S]*?)```/g, (_, lang, code) => {
    const language = lang.trim() || 'bash';
    return `<pre class="markdown-code"><code class="language-${language}">${escapeHtml(code.trim())}</code></pre>`;
  });
}


    function formatCodeBlocks(input: string): string {
  return input.replace(/```(bash)?\n([\s\S]*?)```/g, (_, lang = 'bash', code) => {
    return `<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`;
  });
}

    function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
  

</script >


    <style>
        .markdown-code {
            background - color: #f6f8fa;
        padding: 1em;
        margin: 1em 0;
        overflow-x: auto;
        border-radius: 6px;
        font-size: 14px;
        font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;
        line-height: 1.5;
        color: #24292f;
}

        .markdown-code code {
            background: none;
        padding: 0;
        color: inherit;
}

    </style>