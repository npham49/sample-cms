import { EditorConfig } from "grapesjs";
import gsPluginBlocksBasic from "grapesjs-blocks-basic";
import gsPluginTuiImageEditor from "grapesjs-tui-image-editor";
import gsPluginExport from "grapesjs-plugin-export";
import gsPluginCustomCode from "grapesjs-custom-code";
import plugins from "./plugins";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const options = (editorRef: any): EditorConfig => ({
  height: "100vh",
  storageManager: {
    type: "local", // Storage type. Available: local | remote
    autosave: true, // Store data automatically
    autoload: true, // Autoload stored data on init
    stepsBeforeSave: 1, // If autosave is enabled, indicates how many changes are necessary before the store method is triggered
  },
  undoManager: { trackSelection: false },
  selectorManager: { componentFirst: true },
  assetManager: {
    uploadName: "file",
    // Disabled at this moment
    // uploadFile: (e) => useUploadFile(e, editorRef),
  },
  panels: { defaults: [] }, // Avoid default panels

  deviceManager: {
    devices: [
      {
        name: "Desktop",
        width: "",
        // widthMedia: "1024px",
      },
      {
        name: "Tablet",
        width: "768px",
        widthMedia: "768px",
      },
      // {
      //   name: "Mobile Landscape",
      //   width: "640px",
      //   widthMedia: "640px",
      // },
      {
        name: "Mobile Portrait",
        width: "375px",
        widthMedia: "375px",
      },
    ],
  },

  plugins: [
    gsPluginBlocksBasic,
    ...plugins,
    gsPluginTuiImageEditor,
    gsPluginExport,
    gsPluginCustomCode,
  ],
  pluginsOpts: {},
});
export default options;
