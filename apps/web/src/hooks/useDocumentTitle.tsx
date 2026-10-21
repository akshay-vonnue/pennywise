import { useEffect } from "react";

interface useDocumentTitleProps {
  title: string;
}

function useDocumentTitle({ title }: useDocumentTitleProps) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default useDocumentTitle;
