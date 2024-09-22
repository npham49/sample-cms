import CustomEditor from "./editor";

export default function TemplatePage({
  params,
}: {
  params: { templateId: string };
}) {
  const { templateId } = params;

  return (
    <div className="h-full">
      {templateId ? (
        <CustomEditor templateId={templateId} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
