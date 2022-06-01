deno compile --target x86_64-unknown-linux-gnu --output dist/linux/run src/index.ts
deno compile --target x86_64-pc-windows-msvc --output dist/windows/run src/index.ts
deno compile --target x86_64-apple-darwin --output dist/mac/run_x86_64 src/index.ts
deno compile --target aarch64-apple-darwin --output dist/mac/run_aarch64 src/index.ts