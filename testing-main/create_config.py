import json

config = {
    "compilerOptions": {
        "composite": True,
        "skipLibCheck": True,
        "module": "ESNext",
        "moduleResolution": "bundler",
        "allowSyntheticDefaultImports": True
    },
    "include": ["vite.config.ts"]
}

with open('tsconfig.node.json', 'w') as f:
    json.dump(config, f, indent=2)

print("tsconfig.node.json created successfully!")