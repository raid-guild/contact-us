import { useEffect } from "react";

export default function DeckRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with the actual filename
    window.location.href = "/deck.pdf";
  }, [navigate]);

  return null; // no UI needed
}
