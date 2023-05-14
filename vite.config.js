import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/dm-deck-notion/', // github pages repo (https://<USERNAME>.github.io/<REPO>/)
});
