# Mirage Static

Static website for the Mirage project — plain HTML/CSS/JS, no build step.

## Related Project

This is the static/public-facing site for the main **Mirage** project located at `../mirage`. Refer to that project for product context, design assets, and image sources.

## Repository

- GitHub: https://github.com/Hovhannesmn/mirage-static
- Remote uses SSH: `git@github.com:Hovhannesmn/mirage-static.git`

## Git Push — SSH Key Required

**Always use the project-local SSH key when pushing.** The key files are stored in the project root (and gitignored):

```
id_ed25519       # private key
id_ed25519.pub   # public key
```

Push command:
```bash
GIT_SSH_COMMAND="ssh -i ./id_ed25519 -o IdentitiesOnly=yes" git push origin main
```

## Hosting

Hosted via GitHub Pages at: https://hovhannesmn.github.io/mirage-static/
