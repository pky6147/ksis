import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

interface CrawlPreviewResponse {
  image: string;
  html: string;
}

interface HtmlLine {
  text: string;
  uid: number;
}

interface ExtractResponse {
  data: string[];
}

const App: React.FC = () => {
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [htmlLines, setHtmlLines] = useState<HtmlLine[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedUid, setSelectedUid] = useState<number | null>(null);
  const [selectedSelector, setSelectedSelector] = useState<string | null>(null);

  const [extractResult, setExtractResult] = useState<string[] | null>(null);
  const [extractLoading, setExtractLoading] = useState(false);

  const [highlight, setHighlight] = useState<{x:number,y:number,width:number,height:number} | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);
  const [scaledHighlight, setScaledHighlight] = useState<{x:number,y:number,width:number,height:number} | null>(null);

  /** URL 입력, 미리보기 */
  const handlePreview = async () => {
    if (!url) return alert("URL을 입력해주세요.");
    setLoading(true);
    try {
      const res = await axios.get<CrawlPreviewResponse>(
        "http://localhost:8080/api/crawl/preview",
        { params: { url } }
      );
      setPreview(res.data.image ? `data:image/png;base64,${res.data.image}` : null);
      setHtmlLines(res.data.html ? formatHTML(res.data.html) : []);
      setSelectedUid(null);
      setSelectedSelector(null);
      setExtractResult(null);
      setHighlight(null);
      setScaledHighlight(null);
    } catch (err) {
      console.error(err);
      alert("미리보기를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  /** HTML 들여쓰기 + UID */
  const formatHTML = (html: string): HtmlLine[] => {
    if (!html) return [];
    const tab = "  ";
    let indent = "";
    let uid = 0;
    const lines: HtmlLine[] = [];

    html
      .replace(/>\s*</g, "><")
      .split(/></)
      .forEach((tag, i, arr) => {
        let t = tag;
        if (i !== arr.length - 1) t = t + ">";
        if (t.match(/^\/\w/)) indent = indent.substring(tab.length);
        lines.push({ text: indent + "<" + t, uid: uid++ });
        if (t.match(/^<?\w[^>]*[^\/]$/) && !t.startsWith("input")) indent += tab;
      });

    return lines;
  };

  /** HTML 라인 클릭 */
  const handleHtmlClick = async (line: HtmlLine) => {
    const match = line.text.match(/<(\w+)([^>]*)>/);
    if (!match) return;

    const tag = match[1];
    const attrs = match[2];
    let selector = tag;

    const idMatch = attrs.match(/id="([^"]+)"/);
    if (idMatch) selector += `#${idMatch[1]}`;

    const classMatch = attrs.match(/class="([^"]+)"/);
    if (classMatch) selector += `.${classMatch[1].split(" ").join(".")}`;

    setSelectedUid(line.uid);
    setSelectedSelector(selector);
    setExtractResult(null);

    // ✅ 백엔드로 selector 좌표 요청
    try {
      const res = await axios.post("http://localhost:8080/api/crawl/highlight", { url, selector });
      setHighlight(res.data);
    } catch (err) {
      console.error(err);
      setHighlight(null);
    }
  };

  /** 이미지와 좌표 스케일링 계산 */
  useEffect(() => {
    if (!highlight || !imgRef.current) return;
    const imgEl = imgRef.current;
    const scaleX = imgEl.clientWidth / imgEl.naturalWidth;
    const scaleY = imgEl.clientHeight / imgEl.naturalHeight;
    setScaledHighlight({
      x: highlight.x * scaleX,
      y: highlight.y * scaleY,
      width: highlight.width * scaleX,
      height: highlight.height * scaleY,
    });
  }, [highlight, preview]);

  /** 선택된 영역 데이터 추출 */
  const handleExtract = async () => {
    if (!url || !selectedSelector) return alert("URL과 선택된 영역을 확인해주세요.");
    setExtractLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/crawl/extract2",
        {
          url,
          areaSelector: "body",
          itemSelector: selectedSelector,
        }
      );
      setExtractResult(res.data.data);
    } catch (err) {
      console.error(err);
      alert("데이터 추출 중 오류가 발생했습니다.");
    } finally {
      setExtractLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL 입력"
          style={{ width: 400, marginRight: 10 }}
        />
        <button onClick={handlePreview} disabled={loading}>
          {loading ? "로딩 중..." : "미리보기"}
        </button>
      </div>

      <div style={{ display: "flex", gap: 2 }}>
        <div style={{ position: "relative", width: "50%", height: 800, border: "1px solid #ccc", overflow: "auto", background: "#fafafa" }}>
          {preview ? (
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                ref={imgRef}
                src={preview}
                alt="미리보기"
                style={{ maxWidth: "100%", height: "auto", display: "block" }}
              />
              {scaledHighlight && (
                <div
                  style={{
                    position: "absolute",
                    left: scaledHighlight.x,
                    top: scaledHighlight.y,
                    width: scaledHighlight.width,
                    height: scaledHighlight.height,
                    border: "2px solid red",
                    boxSizing: "border-box",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          ) : (
            <p>미리보기 이미지가 없습니다.</p>
          )}
        </div>

        <div style={{ width: "50%", height: 800, border: "1px solid #ccc", overflow: "auto", background: "#1e1e1e", color: "#dcdcdc", fontFamily: "monospace", fontSize: 12, padding: 10, whiteSpace: "pre-wrap", cursor: "pointer" }}>
          {htmlLines.length > 0
            ? htmlLines.map((line) => (
                <div
                  key={line.uid}
                  onClick={() => handleHtmlClick(line)}
                  style={{
                    background: selectedUid === line.uid ? "rgba(255,255,0,0.2)" : "transparent",
                  }}
                >
                  {line.text}
                </div>
              ))
            : "HTML 소스가 없습니다."}
        </div>
      </div>

      <div style={{ marginTop: 10 }}>
        <strong>선택된 CSS Selector: </strong>
        {selectedSelector || "선택된 영역이 없습니다."}
        {selectedSelector && (
          <button onClick={handleExtract} disabled={extractLoading} style={{ marginLeft: 10 }}>
            {extractLoading ? "추출 중..." : "데이터 추출"}
          </button>
        )}
      </div>

      {extractResult && (
        <div style={{ marginTop: 10 }}>
          <strong>추출 결과:</strong>
          <ul>
            {extractResult.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;