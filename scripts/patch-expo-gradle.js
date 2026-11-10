const fs = require('fs');
const path = require('path');

const targetFile = path.join(
  __dirname,
  '..',
  'node_modules',
  'expo-modules-core',
  'android',
  'ExpoModulesCorePlugin.gradle'
);

if (fs.existsSync(targetFile)) {
  let content = fs.readFileSync(targetFile, 'utf8');

  // Replace ext.useExpoPublishing with completely safe implementation
  const safePublishing = `ext.useExpoPublishing = {
  try {
    if (!project.plugins.hasPlugin('maven-publish')) {
      apply plugin: 'maven-publish'
    }

    project.android {
      publishing {
        singleVariant("release") {
          withSourcesJar()
        }
      }
    }

    project.afterEvaluate {
      try {
        publishing {
          publications {
            def releaseComponent = components.findByName("release")
            if (releaseComponent != null) {
              if (findByName("release") == null) {
                create("release", MavenPublication) {
                  from releaseComponent
                }
              }
            }
          }
          repositories {
            maven {
              url = mavenLocal().url
            }
          }
        }
      } catch (Exception ignored) {}
    }
  } catch (Exception ignored) {}
}`;

  const regex = /ext\.useExpoPublishing\s*=\s*\{[\s\S]*?\n\}/;
  if (regex.test(content)) {
    content = content.replace(regex, safePublishing);
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log('Successfully patched ExpoModulesCorePlugin.gradle with bulletproof publishing guard.');
  }
}
