
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [jenkinsFile, setJenkinsFile] = useState("");
  const [convertedYaml, setConvertedYaml] = useState("");

  const convertFile = async () => {
    const response = await fetch("http://localhost:5000/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jenkinsfile: jenkinsFile }),
    });
    const data = await response.text();
    setConvertedYaml(data);
  };

  const downloadYaml = () => {
    const blob = new Blob([convertedYaml], { type: "text/yaml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = ".gitlab-ci.yml";
    link.click();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Jenkinsfile to GitLab CI Converter</h1>
      <textarea rows="15" cols="100" value={jenkinsFile} onChange={(e) => setJenkinsFile(e.target.value)} placeholder="Paste your Jenkinsfile here"></textarea>
      <br/><br/>
      <button onClick={convertFile}>Convert</button>
      {convertedYaml && (
        <>
          <h3>Converted .gitlab-ci.yml</h3>
          <pre>{convertedYaml}</pre>
          <button onClick={downloadYaml}>Download YAML</button>
        </>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
