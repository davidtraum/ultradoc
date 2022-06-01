deno compile --target x86_64-unknown-linux-gnu --output bin/linux_x86 src/index.ts
deno compile --target x86_64-pc-windows-msvc --output bin/windows_x86 src/index.ts
deno compile --target x86_64-apple-darwin --output bin/apple_x86 src/index.ts
deno compile --target aarch64-apple-darwin --output bin/apple_aarch64 src/index.ts