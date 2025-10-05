# Project Cleanup Guide

## 📊 **File Analysis Summary**

Total files analyzed: **68 files**
Total project size (excluding node_modules/.next): **~1.5MB**

---

## ❌ **Files Safe to Remove (812KB)**

These files are cache, artifacts, or IDE-specific that will regenerate automatically:

### **1. Test Artifacts (516KB)**
```
playwright-report/     512KB   ← HTML test report
test-results/            4KB   ← Test metadata
```
**Impact:** None. Regenerated on `npm run test:e2e`

### **2. Build Cache (228KB)**
```
tsconfig.tsbuildinfo   228KB   ← TypeScript incremental build cache
```
**Impact:** None. Regenerated on `npm run type-check`

### **3. IDE Caches (68KB)**
```
.cursor/                64KB   ← Cursor IDE cache & screenshots
.claude/                 4KB   ← Claude AI settings
```
**Impact:** None. Personal settings, already in `.gitignore`

---

## ✅ **Files to Keep (Essential)**

### **Source Code (88KB)**
- `src/` - Application code
- `tests/` - Test files
- `public/` - Static assets

### **Dependencies (404KB)**
- `package.json` - Dependencies list
- `package-lock.json` - Lock file

### **Configuration (28KB)**
- All `*.config.*` files
- `tsconfig.json`
- `.gitignore`, `.dockerignore`

### **Documentation (228KB)**
- `README.md`, `CLAUDE.md`, `TODO.md`
- `docs/` - All guides
- `ai_docs/` - AI collaboration docs

### **Docker & Deployment (12KB)**
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`

### **Git Hooks (16KB)**
- `.husky/`

---

## 🎯 **Recommended Cleanup Actions**

### **Safe Cleanup (Removes 812KB)**
```bash
# Remove all cache and generated files
rm -rf .cursor/
rm -rf .claude/
rm -rf test-results/
rm -rf playwright-report/
rm tsconfig.tsbuildinfo

# Verify removal
echo "Removed ~812KB of cache files"
```

### **Deep Clean (If Needed)**
```bash
# Additional removals (will regenerate)
rm -rf node_modules/          # 556MB - npm install to restore
rm -rf .next/                 # 22MB - npm run dev to restore
rm -rf coverage/              # If exists
rm next-env.d.ts              # Auto-generated

# Reinstall
npm install
npm run dev
```

---

## 📋 **Removal Checklist**

Before removing files, ensure:

- [ ] You've committed any important changes
- [ ] You understand what each file does
- [ ] You know how to regenerate removed files
- [ ] You have backups if unsure

---

## ⚠️ **NEVER Remove These**

```bash
❌ src/                   # Your code
❌ package.json           # Dependencies
❌ package-lock.json      # Lock file
❌ tsconfig.json          # TS config
❌ next.config.ts         # Next.js config
❌ tests/                 # Test code (not artifacts)
❌ docs/                  # Documentation
❌ .gitignore             # Git rules
❌ .husky/                # Git hooks
❌ All *.config.* files   # Configurations
```

---

## 🔄 **How to Regenerate Removed Files**

### **TypeScript Build Cache**
```bash
npm run type-check
# Regenerates: tsconfig.tsbuildinfo
```

### **Test Artifacts**
```bash
npm test
# Regenerates: coverage/

npm run test:e2e
# Regenerates: test-results/, playwright-report/
```

### **Next.js Types**
```bash
npm run dev
# Regenerates: next-env.d.ts
```

### **Build Output**
```bash
npm run build
# Regenerates: .next/
```

---

## 💾 **Disk Space Savings**

```
Before Cleanup:
  Project files: ~1.5MB
  Cache & artifacts: ~812KB
  
After Cleanup:
  Project files: ~700KB
  Cache & artifacts: 0KB
  
Savings: ~54% reduction in tracked files
```

---

## 🎯 **When to Clean**

**Clean regularly:**
- Before committing to git
- Before creating a PR
- When switching branches
- When disk space is low

**Don't clean:**
- During active development
- In the middle of debugging
- If you're unsure

---

## 📚 **Quick Reference**

### **What's in .gitignore (Auto-Ignored)**
```
node_modules/
.next/
coverage/
.cursor/
.claude/
test-results/
playwright-report/
*.tsbuildinfo
```

These won't be committed even if they exist.

### **What Should Be Committed**
```
src/
tests/
docs/
public/
All config files
All documentation
.gitignore, .dockerignore
Dockerfile, docker-compose.yml
```

---

## ✅ **Summary**

**Safe to remove:** 812KB (9 items)
- IDE caches (68KB)
- Test artifacts (516KB)  
- Build caches (228KB)

**Must keep:** Everything else
- Source code
- Configuration
- Documentation
- Dependencies

**Result:** Cleaner, faster, more maintainable repository!

