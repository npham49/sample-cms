import CustomEditor from "./editor";

export default function TemplatePage({
  params,
}: {
  params: { templateId: string };
}) {
  const { templateId } = params;

  return (
    <div>
      {templateId ? (
        <CustomEditor templateId={templateId} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
