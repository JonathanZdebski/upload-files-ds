import { useEffect } from "react";

interface PageTitleProps {
  title: string;
  description?: string;
}

function PageTitle({ title, description }: PageTitleProps) {
  useEffect(() => {
    // Atualiza o título da página
    document.title = title;

    // Atualiza a meta descrição
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');

      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        metaDescription.setAttribute("content", description);
        document.head.appendChild(metaDescription);
      }
    }

    return () => {
      // Remove a meta descrição se necessário
      if (description) {
        const metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescription) {
          document.head.removeChild(metaDescription);
        }
      }
    };
  }, [title, description]);

  return null;
}

export default PageTitle;
