import { useEffect } from "react";

interface PageTitleProps {
  title: string;
}

function PageTitle({ title }: PageTitleProps) {
  interface PageTitleProps {
    title: string;
  }
  useEffect(() => {
    document.title = title;

    return () => {};
  }, [title]);

  return null;
}

export default PageTitle;
