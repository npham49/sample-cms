"use client";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";

import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";

const Editor = ({ templateId }: { templateId: string }) => {
  const [loading, setLoading] = useState(true);
  const emailEditorRef = useRef<EditorRef | null>(null);
  const [preview, setPreview] = useState(false);

  const saveDesign = () => {
    const unlayer = emailEditorRef.current?.editor;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    unlayer?.saveDesign((design: any) => {
      console.log("saveDesign", design);
      alert("Design JSON has been logged in your developer console.");
    });
  };

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { html } = data;
      console.log("exportHtml", html);
      alert("Output HTML has been logged in your developer console.");
    });
  };

  const togglePreview = () => {
    const unlayer = emailEditorRef.current?.editor;

    if (preview) {
      unlayer?.hidePreview();
      setPreview(false);
    } else {
      unlayer?.showPreview({ device: "desktop" });
      setPreview(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDesignLoad = (data: any) => {
    console.log("onDesignLoad", data);
  };

  const onLoad: EmailEditorProps["onLoad"] = (unlayer) => {
    setLoading(true);
    console.log("onLoad", unlayer);
    unlayer.addEventListener("design:loaded", onDesignLoad);
    // unlayer.loadDesign(sample);
  };

  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    emailEditorRef.current?.editor?.addEventListener(
      "design:updated",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function (data: any) {
        // Design is updated by the user
        const type = data.type; // body, row, content
        const item = data.item;
        const changes = data.changes;
        console.log("design:updated", type, item, changes);
      }
    );
    console.log("onReady", unlayer);
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <div>
        <h1>React Email Editor ({templateId})</h1>

        <Button onClick={togglePreview}>
          {preview ? "Hide" : "Show"} Preview
        </Button>
        <Button onClick={saveDesign}>Save Design</Button>
        <Button onClick={exportHtml}>Export HTML</Button>
      </div>
      {loading && <p>Loading...</p>}
      <EmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        onReady={onReady}
        style={{ height: "100vh" }}
        options={{
          features: {
            textEditor: {
              spellChecker: true,
            },
          },
          displayMode: "email",
          mergeTags: {
            name: {
              name: "Client's Name",
              value: "{{name}}",
              sample: "Client's Name",
            },
            email: {
              name: "Client's Email",
              value: "{{email}}",
              sample: "Client's Email",
            },
          },
          version: "latest",
          appearance: {
            theme: "modern_light",
          },
        }}
      />
    </div>
  );
};

export default Editor;
