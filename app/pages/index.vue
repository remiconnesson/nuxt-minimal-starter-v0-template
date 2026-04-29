<script setup lang="ts">
useHead({
  title: 'Nuxt v0 Starter',
})

const suggestions = [
  {
    title: 'Add a navigation bar',
    prompt: 'Add a sticky top navigation bar with links to Home, About, and Contact.',
  },
  {
    title: 'Build a hero section',
    prompt: 'Replace the home page with a hero section: headline, subheadline, and a primary CTA button.',
  },
  {
    title: 'Create a blog index',
    prompt: 'Add a /blog page that lists posts from a local array of mock data, with title, date, and excerpt.',
  },
  {
    title: 'Add a contact form',
    prompt: 'Create a /contact page with a form (name, email, message) that validates input and shows a success state.',
  },
  {
    title: 'Add a dark mode toggle',
    prompt: 'Add a dark mode toggle in the header that persists across reloads.',
  },
  {
    title: 'Build a pricing page',
    prompt: 'Create a /pricing page with three tiers (Free, Pro, Team) in a responsive card layout.',
  },
]

const copiedIndex = ref<number | null>(null)

const handleCopySuggestion = async (prompt: string, index: number) => {
  await navigator.clipboard.writeText(prompt)
  copiedIndex.value = index
  setTimeout(() => {
    copiedIndex.value = null
  }, 2000)
}
</script>

<template>
  <main>
    <header class="hero">
      <span class="badge">Nuxt 4 · v0 starter</span>
      <h1>Build with Nuxt on v0</h1>
      <p class="lede">
        A minimal Nuxt 4 starter, ready for v0.
      </p>
    </header>

    <aside class="callout" role="note">
      <div class="callout-icon" aria-hidden="true">!</div>
      <div>
        <strong>Heads up:</strong> If v0 reports a
        <code>Module not found</code> error, hard-restart the dev server
        using the <strong>Hard restart</strong> button in the v0 UI
        (the power icon next to the running indicator in the preview toolbar).
      </div>
    </aside>

    <section>
      <h2>Try asking v0 to&hellip;</h2>
      <ul class="suggestions">
        <li 
          v-for="(s, index) in suggestions" 
          :key="s.title"
          @click="handleCopySuggestion(s.prompt, index)"
          class="suggestion-item"
        >
          <h3>{{ s.title }}</h3>
          <p>&ldquo;{{ s.prompt }}&rdquo;</p>
          <div v-if="copiedIndex === index" class="copy-feedback">
            copied to clipboard, now paste in the v0 chat area
          </div>
        </li>
      </ul>
    </section>

    <footer>
      <p>
        Edit <code>app/pages/index.vue</code> to change this page.
        See <a href="https://nuxt.com/docs" target="_blank" rel="noreferrer">Nuxt docs</a>
        for more.
      </p>
    </footer>
  </main>
</template>

<style scoped>
main {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  max-width: 56rem;
  margin: 0 auto;
  padding: 4rem 1.5rem 6rem;
  color: #1a1a1a;
  line-height: 1.6;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #00a878;
  background: #e6f7f1;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  margin-bottom: 1.25rem;
}

h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 1rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #00a878 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lede {
  font-size: 1.125rem;
  color: #555;
  max-width: 36rem;
  margin: 0 auto;
}

.callout {
  display: flex;
  gap: 0.875rem;
  align-items: flex-start;
  background: #fff8e6;
  border: 1px solid #f5d77a;
  border-left: 4px solid #e5a700;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin: 0 0 3rem;
  font-size: 0.95rem;
  color: #5c4500;
}

.callout-icon {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #e5a700;
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-family: Georgia, serif;
}

.callout code {
  background: rgba(229, 167, 0, 0.15);
  padding: 0.1em 0.35em;
  border-radius: 4px;
  font-size: 0.875em;
}

section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1.25rem;
  color: #1a1a1a;
}

.suggestions {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 0.875rem;
}

.suggestions li {
  background: #fafafa;
  border: 1px solid #ececec;
  border-radius: 10px;
  padding: 1rem 1.125rem;
  transition: border-color 0.15s, transform 0.15s;
  cursor: pointer;
  position: relative;
}

.suggestions li:hover {
  border-color: #00a878;
  transform: translateY(-1px);
}

.suggestions h3 {
  font-size: 0.9375rem;
  font-weight: 600;
  margin: 0 0 0.4rem;
  color: #1a1a1a;
}

.suggestions p {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.copy-feedback {
  font-size: 0.75rem;
  color: #00a878;
  margin-top: 0.5rem;
  font-weight: 500;
  animation: fadeIn 0.2s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

footer {
  margin-top: 4rem;
  padding-top: 1.5rem;
  border-top: 1px solid #ececec;
  font-size: 0.875rem;
  color: #888;
  text-align: center;
}

footer a {
  color: #00a878;
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}

code {
  font-family: 'SF Mono', Menlo, Consolas, monospace;
  font-size: 0.875em;
  background: #f1f1f1;
  padding: 0.1em 0.35em;
  border-radius: 4px;
}

@media (prefers-color-scheme: dark) {
  main {
    color: #ededed;
  }

  .lede {
    color: #a0a0a0;
  }

  h1 {
    background: linear-gradient(135deg, #ededed 0%, #00d896 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .badge {
    color: #00d896;
    background: rgba(0, 168, 120, 0.15);
  }

  .callout {
    background: rgba(229, 167, 0, 0.08);
    border-color: rgba(245, 215, 122, 0.3);
    color: #f5d77a;
  }

  .suggestions li {
    background: #141414;
    border-color: #262626;
  }

  .suggestions li:hover {
    border-color: #00d896;
  }

  .suggestions h3 {
    color: #ededed;
  }

  .suggestions p {
    color: #a0a0a0;
  }

  .copy-feedback {
    color: #00d896;
  }

  footer {
    border-color: #262626;
    color: #888;
  }

  footer a {
    color: #00d896;
  }

  code {
    background: #1a1a1a;
    color: #ededed;
  }
}
</style>

<style>
body {
  margin: 0;
  background: #fff;
}

@media (prefers-color-scheme: dark) {
  body {
    background: #0a0a0a;
  }
}
</style>
