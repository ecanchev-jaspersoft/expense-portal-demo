# Expense Portal Demo

This project is a demo application for managing expenses, built with React and Vite.

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: Version LTS/Iron (verify with `node -v`)
- **Yarn Classic**: Package manager (verify with `yarn -v`)

## Getting Started

Follow these steps to set up and run the project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ecanchev-jaspersoft/expense-portal-demo.git
   cd expense-portal-demo
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Run the development server**:
   ```bash
   yarn dev
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:5173` (default Vite dev server port).

## Project Structure

The project follows a modular structure:

- `src/`: Contains the source code, including components, pages, and styles.
- `public/`: Static assets served directly.
- `package.json`: Project metadata and scripts.

## Scripts

- `yarn dev`: Starts the development server.
- `yarn build`: Builds the project for production.
- `yarn preview`: Previews the production build locally.
- `yarn lint`: Lints the project files.

## Pre-Commit Hook

This project uses Husky to enforce linting before every commit. The `yarn lint` command will automatically run before each commit to ensure code quality.

## License

This project is licensed under the MIT License.

---

For any issues or contributions, feel free to open a pull request or issue on the [GitHub repository](https://github.com/ecanchev-jaspersoft/expense-portal-demo).