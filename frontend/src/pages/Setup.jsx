import { useState } from "react";
import { useNavigate } from "react-router";
import Box from "../components/ui/Box";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Setup() {
  const [cdl, setCdl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isValid = cdl.trim() !== "";

  async function handleSave() {
    if (!isValid || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`http://localhost:3000/cdl/exists/${cdl}`);
      const data = await res.json();

      if (!data.exists) {
        setError("CDL non trovato nel database");
        return;
      }

      await window.api.saveConfig({
        cdl: Number(cdl),
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Impossibile contattare il server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-[#0f0f0f] px-4">
      <Box
        titolo="Seleziona macchina"
        descrizione="Inserisci il CDL della segatrice"
        className="w-full max-w-md"
      >
        <Input
          label="CDL"
          placeholder="Es: 50723"
          value={cdl}
          onChange={setCdl}
        />

        <Button
          text={loading ? "Verifica in corso..." : "Accedi"}
          onClick={handleSave}
          disabled={!isValid || loading}
        />
      </Box>

      {error && (
        <div className="w-full max-w-md rounded bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
