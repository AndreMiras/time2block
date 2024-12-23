# How to release

This is documenting the release process.

We follow a [trunk-based development model](https://trunkbaseddevelopment.com/),
hence everything pushed to the `main` branch is deployed automatically. Each
commit to `main` results in a Docker image being built and tagged with the
commit hash.

To highlight specific milestones or stable releases, we use **semantic
versioning** (`major.minor.patch`) for tagging. These tags serve as clear
markers of significant versions.

## Semantic Versioning

When preparing a release, decide the version based on
[semantic versioning](https://semver.org/):

- **Major**: Breaking changes.
- **Minor**: Backward-compatible features.
- **Patch**: Bug fixes or small improvements.

Set the version accordingly:

```sh
VERSION=major.minor.patch
```

## Create a Tag

Once the version is determined, commit and tag:

```sh
git tag -a v$VERSION -m ":bookmark: v$VERSION"
```

Then push the tag:

```sh
git push origin v$VERSION
```

## Automated Docker Image Builds

Every push to `main` automatically triggers:

1. A Docker image build.
2. Tagging the image as:
   - `latest`: Represents the most recent commit to `main`.
   - Specific version (e.g., `1.0.0`), if a Git tag is associated with the
     commit.
   - A unique identifier based on `git describe --tags --always` for non-tagged
     commits, providing traceability for every build.
