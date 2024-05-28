
## How to Add a New Competition

1. Go to the `content` branch in GitHub.
2. Navigate to the `public/icons` folder.
3. Upload a new competition icon file into the `public/icons` folder.
4. Commit changes directly to the `content` branch.
5. Edit the `content/competitions.yaml` file (see instructions below).
6. Commit changes directly to the `content` branch.
7. Create a pull request with content changes from the `content` branch into the `develop` branch.
8. Wait for a successful build of the `develop` branch.
9. Visit the test website and check if everything is correct.
10. Create a pull request from the `develop` branch into the main branch.
11. Wait for successfull main branch build. 
12. Visit website and check if everything is correct.

### How to Fill the `competitions.yaml` File

0. If a competition does not have a logo, skip to step 3.
1. Upload an image into the `public/icons` folder.
2. Save the image path in the `public` folder: e.g., `icons/fantom.jpg` (do not include the `public` prefix).
3. Open the `competitions.yaml` file in the `content` folder.
4. Fill in the information about the competition in the following format:

```yaml
id: number
name: string
type: farm or contest
startDate: YYYY/MM/DD
endDate: YYYY/MM/DD
season: 2022, 2023, 2024, 2025, or 2026
imageSrc: Leave blank or fill with image path relative to the public folder
```

> **Note:** Be very careful with spaces! YAML is a space-sensitive file format.

**Example:**

```yaml
  - id: 1
    name: Farm Spring 2022
    type: farm
    startDate: 2022/04/01
    endDate: 2022/05/04
    season: 2022
    imageSrc: /icons/farm_spring.svg
```
