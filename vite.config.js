import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  // Base URL for GitHub Pages
  base: '/markdown-presentation-online-editor/',

  // Base configuration
  root: 'src',
  publicDir: '../public',
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    host: true,
    // Serve presentations from root directory and node_modules
    fs: {
      allow: ['..', '../node_modules']
    }
  },

  // Custom plugin to serve markdown files
  plugins: [
    // Legacy browser support
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    
    // Plugin to serve markdown files from /presentations
    {
      name: 'serve-presentations',
      configureServer(server) {
        // Endpoint to list presentations with metadata
        server.middlewares.use('/api/presentations', (req, res, next) => {
          if (req.method === 'GET' && req.url === '/') {
            try {
              const presentationsDir = path.join(process.cwd(), 'presentations')
              const files = fs.readdirSync(presentationsDir)
                .filter(file => path.extname(file) === '.md')
                .map(file => {
                  const filePath = path.join(presentationsDir, file)
                  const content = fs.readFileSync(filePath, 'utf8')
                  
                  // Parse YAML front-matter
                  const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/)
                  let metadata = {}
                  
                  if (frontMatterMatch) {
                    const yamlContent = frontMatterMatch[1]
                    // Simple YAML parser for basic key: "value" pairs
                    yamlContent.split('\n').forEach(line => {
                      const match = line.match(/^(\w+):\s*"([^"]*)"$/)
                      if (match) {
                        metadata[match[1]] = match[2]
                      }
                    })
                  }
                  
                  return {
                    filename: file,
                    path: `/presentations/${file}`,
                    metadata: {
                      title: metadata.title || file.replace('.md', ''),
                      description: metadata.description || '',
                      theme: metadata.theme || 'default',
                      author: metadata.author || '',
                      date: metadata.date || ''
                    }
                  }
                })
              
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(files))
            } catch (error) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: error.message }))
            }
          } else {
            next()
          }
        })
        
        // Serve individual markdown files
        server.middlewares.use('/presentations', (req, res, next) => {
          const filePath = path.join(process.cwd(), 'presentations', req.url)
          
          if (fs.existsSync(filePath) && path.extname(filePath) === '.md') {
            res.setHeader('Content-Type', 'text/plain')
            res.end(fs.readFileSync(filePath, 'utf8'))
          } else {
            next()
          }
        })
      }
    }
  ],
  
  // Build configuration
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    
    // Asset optimization
    rollupOptions: {
      output: {
        manualChunks: {
          'reveal': ['reveal.js']
        }
      }
    },
    
    // Compression and minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  // Module resolution
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/assets',
      '@presentations': '../presentations'
    }
  },
  
  // Asset handling
  assetsInclude: ['**/*.md']
})