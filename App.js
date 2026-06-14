import { useState, useRef, useEffect } from "react";

const HEADER_LOGO = "data:image/png;base64,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";
const PWD_LOGO = "data:image/png;base64,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";
const FOX = "data:image/png;base64,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";
const TEAL = "#2a8fa3";
const ORANGE = "#c06040";

const SYSTEM_PROMPT = `Sos el Tutor Virtual de Innovación de BlueberryFox. Acompañás a jóvenes participantes de un programa de Tutorías de Innovación en la búsqueda de oportunidades de innovación dentro de su organización.

METODOLOGÍA DEL PROGRAMA:
El programa tiene 4 etapas: DESCUBRIR → IDEAR → DESARROLLAR → DEMOSTRAR.

REGLAS GENERALES:
- Hacé UNA pregunta por vez, nunca abrumes con varias juntas.
- Respondé siempre en español, con tono cercano, claro y motivador.
- Respuestas breves (máximo ~150 palabras).
- No des la solución: ayudá a que el participante piense.
- Si te preguntan algo fuera del programa, redirigí amablemente al tema.

FORMATO ESPECIAL — OPCIONES CLIQUEABLES:
Cada vez que necesites preguntar en qué desafío está trabajando el participante, terminá tu mensaje con esta línea exacta (sin cambiar nada):
[[OPTIONS:Cuenta Joven|Cuenta Familia|Modelo de Atención en Canales Digitales]]

RECOMENDACIONES PROACTIVAS:
Al final de cada intercambio significativo agregá siempre una sección breve llamada "💡 Para tener en cuenta:" con 1 o 2 recomendaciones o aspectos importantes que NO surgieron en la conversación pero que el participante debería considerar.
Cuando la conversación llegue a un punto de cierre (el participante tiene observaciones, insights o una oportunidad en mente), SIEMPRE ofrecé ayudarlo a estructurarla formalmente con la metodología IDEO: el HMW. Podés decir: "¿Querés que te ayude a formular tu oportunidad de innovación de forma clara? Podemos armar el enunciado y el HMW."

DESAFÍOS DEL PROGRAMA:

DESAFÍO 1 — CUENTA JOVEN
HMW: ¿Cómo podríamos acompañar a los jóvenes en los momentos más importantes de su vida financiera?
Organización: iniciativas previas, propuesta de valor, beneficios, alianzas con universidades.
Mercado: propuestas de otras entidades, fintechs, tendencias de jóvenes con el dinero.
Cliente: primeras experiencias financieras, independencia, ahorro, educación financiera, hábitos digitales.

DESAFÍO 2 — CUENTA FAMILIA
HMW: ¿Cómo podríamos potenciar la propuesta de valor de Cuenta Familia para que sea más relevante y atractiva?
Organización: propuesta actual, funcionalidades, métricas, áreas involucradas.
Mercado: productos similares, beneficios diferenciales, tendencias en banca familiar.
Personas: organización financiera familiar, gestión compartida, ahorro para objetivos, educación financiera de hijos.

DESAFÍO 3 — MODELO DE ATENCIÓN EN CANALES DIGITALES
HMW: ¿Cómo podríamos ofrecer una experiencia de atención digital simple, integrada y resolutiva?
Organización: modelo actual, canales existentes, indicadores de satisfacción, principales reclamos.
Mercado: experiencias de otras entidades, tendencias en autogestión, IA y omnicanalidad.
Personas: autogestión, fricciones en los recorridos, integración entre canales.

MODOS DE TRABAJO:

== PLAN DE INVESTIGACIÓN ==
1. Si no sabés en qué desafío trabaja, preguntáselo (con [[OPTIONS:...]]).
2. Explorá las 3 dimensiones: organización, mercado y cliente/personas.
3. Hacé UNA pregunta a la vez sobre qué ya exploró en cada dimensión.
4. Señalá qué falta cubrir con una pregunta motivadora.

== PREPARAR ENTREVISTA ==

PRINCIPIOS CLAVE DE IDEO PARA ENTREVISTAR (usá estos para guiar al participante):

MENTALIDAD:
- La entrevista es una CONVERSACIÓN, no un cuestionario. El objetivo es entender la vida, experiencias y necesidades de la persona, no obtener respuestas específicas.
- "Enamorate de la persona": la curiosidad genuina y la empatía cambian todo. Cuando realmente te interesa la historia del otro, aparecen los insights más ricos.
- Tratá al entrevistado como SOCIO de la investigación, no como fuente de datos. Explicale por qué su experiencia importa.

TÉCNICAS CONCRETAS:
- Preguntá sobre EXPERIENCIAS PASADAS, no sobre opiniones o hipotéticos: "Contame la última vez que..." es mejor que "¿Qué pensás sobre...?" o "¿Usarías...?"
- Usá preguntas ABIERTAS siempre: empezar con "¿Cómo...?", "¿Qué...?", "Contame sobre..." Nunca preguntas de sí/no.
- ESCUCHAR MÁS QUE HABLAR: la regla es 70/30. Dejá que la persona llene el silencio.
- SILENCIOS CÓMODOS: cuando la persona termina de hablar, resistí el impulso de seguir. Los silencios suelen abrir respuestas más profundas.
- PROFUNDIZAR con "¿Por qué?", "¿Podés contarme más?", "¿Qué quisiste decir con eso?" — el primer insight raramente es el más valioso.
- BUSCÁ WORKAROUNDS Y HACKS: si la persona inventó una forma de hacer algo, ahí hay una necesidad no resuelta.
- EVITÁ PREGUNTAS INDUCTIVAS: no sugerís la respuesta en la pregunta. Mal: "¿Te resulta difícil usar la app?" Bien: "¿Cómo es tu experiencia usando la app?"
- OBSERVÁ lo no verbal: dudas, suspiros, entusiasmo repentino — son señales igual de valiosas que las palabras.
- ACEPTÁ SIEMPRE LO QUE OFRECE: si te ofrecen agua, una recorrida, ver su celular — aceptá. Genera confianza y a veces da los mejores insights.

ESTRUCTURA DEL SCRIPT (máximo 6-8 preguntas):
1. Apertura cálida: presentación + agradecer + explicar el por qué de la entrevista (2 min)
2. Contexto general: entender la vida/rol/día a día del entrevistado (1-2 preguntas)
3. Exploración de experiencias: preguntas sobre situaciones concretas y pasadas (3-4 preguntas)
4. Profundización: seguir los hilos más interesantes con "¿por qué?" y "contame más"
5. Cierre: ¿Hay algo más que quieras agregar? Agradecer genuinamente.

PARA GENERAR EL SCRIPT:
1. Preguntale al participante: ¿A quién vas a entrevistar? ¿Cuál es su rol/contexto? ¿Qué desafío estás explorando?
2. Con esos datos, generá preguntas específicas al contexto — no genéricas.
3. Incluí una o dos preguntas "comodín" de profundización.
4. Advertile que el script es una GUÍA, no un libreto — si surge algo interesante, que lo siga aunque se desvíe.

== OBSERVACIONES → OPORTUNIDADES ==
1. Pedile que comparta sus principales observaciones.
2. Formulá NO MÁS DE TRES oportunidades como HMW.
3. Para cada HMW, explicá en una línea por qué tiene potencial.

== ABOGADO DEL DIABLO ==
Evaluá OPORTUNIDADES (no ideas/soluciones — estamos en DESCUBRIR):
1. Pedile que describa la oportunidad en 2-3 líneas.
2. Evaluá desde 3 ángulos: ¿es un problema real?, ¿es relevante para el negocio?, ¿ya está resuelta?
3. Señalá 1-2 fortalezas y 1-2 preguntas críticas.
4. NO hables de soluciones. Cerrá con una pregunta para fortalecer evidencia.

== CÓMO FORMULAR UNA OPORTUNIDAD DE INNOVACIÓN (metodología IDEO) ==

Usá este conocimiento para guiar al participante cuando llegue el momento de formalizar su oportunidad. Trabajá SOLO con el HMW, 

QUÉ ES UN HMW:
El HMW (¿Cómo podríamos...?) es la forma en que IDEO formula toda oportunidad de innovación. Es una pregunta abierta e inspiradora que enmarca el desafío sin imponer una solución.
Tim Brown, IDEO: "Cada desafío en IDEO comienza con un ¿Cómo podríamos?"

REGLAS PARA UN BUEN HMW:
- Suficientemente AMPLIO para permitir múltiples soluciones (no una sola respuesta obvia)
- Suficientemente ESPECÍFICO para saber desde dónde empezar (no tan vago que no oriente)
- NO debe sugerir una solución en particular
- Debe estar centrado en una necesidad humana real, basado en lo que el participante investigó
- Mal ejemplo (demasiado amplio): "¿Cómo podríamos mejorar la experiencia bancaria?"
- Mal ejemplo (demasiado estrecho / ya implica solución): "¿Cómo podríamos hacer una app de ahorro para jóvenes?"
- Buen ejemplo: "¿Cómo podríamos acompañar a los jóvenes en sus primeras decisiones financieras importantes para que se sientan seguros y capaces?"
Test rápido: ¿Puede responderse de al menos 5 maneras distintas? Si sí, está bien calibrado.

CHECKLIST PARA EVALUAR UN HMW:
✓ ¿Está centrado en una necesidad humana real (no en tecnología o producto)?
✓ ¿No implica una solución específica?
✓ ¿Genera curiosidad y abre el espacio creativo?
✓ ¿Está respaldado por observaciones o evidencia de investigación?
✓ ¿Es relevante para el desafío del programa en el que trabaja?

CÓMO AYUDAR A CONSTRUIRLO:
1. Pedile al participante que te cuente qué necesidad o tensión detectó en su investigación
2. Con eso, formulá juntos el HMW: empezá con "¿Cómo podríamos..." y construilo desde la necesidad de la persona, no desde la solución
3. Evaluá el HMW con el checklist
4. Si no pasa, ajustalo: amplialo si es muy estrecho, enfocalo si es muy vago
5. Al terminar, el participante debe tener UN HMW claro y sólido que le sirva de punto de partida para la etapa IDEAR`;

const QUICK_STARTS = [
  "Ayudame a armar mi plan de investigación",
  "Ayudame a preparar una entrevista",
  "Tengo observaciones, ayudame a encontrar oportunidades",
  "Hacé de abogado del diablo con mi oportunidad",
];

function parseMsg(text) {
  const m = text.match(/\[\[OPTIONS:(.*?)\]\]/);
  if (!m) return { text, options: null };
  return {
    text: text.replace(/\[\[OPTIONS:.*?\]\]/, "").trim(),
    options: m[1].split("|").map(o => o.trim())
  };
}

export default function TutorInnovacion() {
  const PASSWORD = process.env.REACT_APP_PASSWORD || "innovacion2025";
  const [unlocked, setUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "¡Hola! Soy tu tutor virtual de innovación de BlueberryFox. Estoy acá para acompañarte en cada etapa del programa.\n\n¿En qué te puedo ayudar hoy?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [hasSpeech, setHasSpeech] = useState(false);
  const bottomRef = useRef(null);
  const recRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.lang = "es-AR"; r.continuous = false; r.interimResults = false;
    r.onresult = e => { setInput(e.results[0][0].transcript); setIsListening(false); };
    r.onend = () => setIsListening(false);
    r.onerror = () => setIsListening(false);
    recRef.current = r; setHasSpeech(true);
  }, []);

  const toggleMic = () => {
    if (!recRef.current) return;
    if (isListening) recRef.current.stop();
    else { try { recRef.current.start(); setIsListening(true); } catch(e) {} }
  };

  const speak = text => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-AR"; u.rate = 0.95;
    window.speechSynthesis.speak(u);
  };

  const send = async text => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const newMsgs = [...messages, { role: "user", text: content }];
    setMessages(newMsgs); setInput(""); setLoading(true);
    const history = newMsgs.map(m => m.role === "user" ? "Participante: " + m.text : "Tutor: " + m.text).join("\n\n");
    const prompt = SYSTEM_PROMPT + "\n\n--- CONVERSACIÓN ---\n" + history + "\n\nTutor:";
    try {
      const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY || "";
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey && {
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true"
          })
        },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: prompt }] })
      });
      const data = await res.json();
      let reply = (data.content || []).map(b => b.text || "").join("").trim();
      if (!reply) reply = "Se cortó la respuesta por un problema temporal. ¿Podés repetir tu última consulta?";
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
      speak(reply);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Ups, hubo un problema de conexión. Probá de nuevo." }]);
    }
    setLoading(false);
  };

  // PASSWORD SCREEN
  if (!unlocked) {
    return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", overflow:"auto", background:"linear-gradient(145deg, #0f172a 0%, #1a3a4a 50%, #1e6a7a 100%)" }}>
        <div style={{ background:"white", borderRadius:"24px", padding:"36px 32px", width:"100%", maxWidth:"360px", margin:"20px", boxShadow:"0 24px 64px rgba(0,0,0,0.4)" }}>
          <div style={{ textAlign:"center", marginBottom:"24px" }}>
            <img src={PWD_LOGO} alt="BlueberryFox" style={{ width:"160px", objectFit:"contain", display:"block", margin:"0 auto" }} />
          </div>
          <p style={{ fontSize:"12px", color:"#94a3b8", margin:"0 0 24px", letterSpacing:"0.1em", textTransform:"uppercase", textAlign:"center", fontWeight:600 }}>
            Tutorías de Innovación
          </p>
          <div style={{ borderTop:"1px solid #f1f5f9", paddingTop:"20px" }}>
            <label style={{ fontSize:"11px", fontWeight:700, color:"#475569", letterSpacing:"0.06em", display:"block", marginBottom:"8px" }}>CONTRASEÑA</label>
            <input type="password" value={passwordInput}
              onChange={e => { setPasswordInput(e.target.value); setPasswordError(false); }}
              onKeyDown={e => { if (e.key==="Enter") { if (passwordInput===PASSWORD) setUnlocked(true); else setPasswordError(true); } }}
              placeholder="••••••••••" autoFocus
              style={{ width:"100%", border:"1.5px solid "+(passwordError?"#ef4444":"#e2e8f0"), borderRadius:"12px", padding:"11px 16px", fontSize:"15px", fontFamily:"inherit", outline:"none", boxSizing:"border-box", background:passwordError?"#fff5f5":"#f8fafc", transition:"all 0.2s" }} />
            {passwordError && <p style={{ fontSize:"12px", color:"#ef4444", margin:"5px 0 0" }}>✗ Contraseña incorrecta</p>}
            <button onClick={() => { if (passwordInput===PASSWORD) setUnlocked(true); else setPasswordError(true); }}
              style={{ width:"100%", border:"none", borderRadius:"12px", padding:"12px", fontSize:"15px", fontWeight:700, cursor:"pointer", color:"white", marginTop:"10px", background:"linear-gradient(135deg,"+TEAL+",#1e7a8f)", boxShadow:"0 4px 16px rgba(42,143,163,0.4)", transition:"all 0.2s" }}>
              Ingresar →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN CHAT
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100vh", background:"#f0f9fa", backgroundImage:"radial-gradient(circle, rgba(42,143,163,0.07) 1px, transparent 1px)", backgroundSize:"24px 24px" }}>

      <header style={{ background:"linear-gradient(90deg,#0f172a,#1a3a4a)", padding:"10px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, boxShadow:"0 2px 12px rgba(0,0,0,0.3)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <img src={HEADER_LOGO} alt="BlueberryFox" style={{ height:"38px", objectFit:"contain" }} />
        </div>
        <button onClick={() => setVoiceEnabled(v => !v)}
          style={{ display:"flex", alignItems:"center", gap:"5px", padding:"5px 12px", borderRadius:"999px", fontSize:"11px", fontWeight:500, cursor:"pointer", transition:"all 0.2s", border:"1px solid "+(voiceEnabled?"transparent":"rgba(255,255,255,0.2)"), background:voiceEnabled?"rgba(42,143,163,0.8)":"rgba(255,255,255,0.08)", color:voiceEnabled?"white":"rgba(255,255,255,0.6)" }}>
          <span>{voiceEnabled?"🔊":"🔇"}</span>
          <span>{voiceEnabled?"Voz activa":"Voz"}</span>
        </button>
      </header>

      <main style={{ flex:1, overflowY:"auto", padding:"20px 16px" }}>
        <div style={{ maxWidth:"640px", margin:"0 auto", display:"flex", flexDirection:"column", gap:"16px" }}>

          {messages.map((m, i) => {
            const parsed = m.role==="assistant" ? parseMsg(m.text) : { text:m.text, options:null };
            return (
              <div key={i}>
                <div style={{ display:"flex", alignItems:"flex-end", gap:"10px", justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
                  {m.role==="assistant" && (
                    <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"white", border:"2px solid "+TEAL, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden", boxShadow:"0 0 0 3px rgba(42,143,163,0.12)" }}>
                      <img src={FOX} alt="" style={{ width:"26px", objectFit:"contain" }} />
                    </div>
                  )}
                  <div style={{ position:"relative", maxWidth:"480px" }}>
                    <div style={{ borderRadius:"18px", padding:"11px 16px", fontSize:"14px", whiteSpace:"pre-wrap", lineHeight:1.65, ...(m.role==="user" ? { background:"linear-gradient(135deg,"+TEAL+",#1e7a8f)", color:"white", borderBottomRightRadius:"4px", boxShadow:"0 2px 10px rgba(42,143,163,0.3)" } : { background:"white", color:"#1e293b", borderLeft:"3px solid "+TEAL, borderBottomLeftRadius:"4px", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }) }}>
                      {parsed.text}
                    </div>
                    {m.role==="assistant" && (
                      <button onClick={() => { const u=new SpeechSynthesisUtterance(parsed.text); u.lang="es-AR"; u.rate=0.95; window.speechSynthesis?.cancel(); window.speechSynthesis?.speak(u); }}
                        style={{ background:"none", border:"none", fontSize:"10px", color:"#94a3b8", cursor:"pointer", padding:"2px 0", marginTop:"2px" }}>
                        🔊 escuchar
                      </button>
                    )}
                  </div>
                </div>
                {parsed.options && (
                  <div style={{ paddingLeft:"46px", display:"flex", flexWrap:"wrap", gap:"8px", marginTop:"10px" }}>
                    {parsed.options.map(opt => (
                      <button key={opt} onClick={() => send(opt)}
                        style={{ fontSize:"12px", background:"white", border:"1px solid #c5dfe6", color:"#1e293b", borderRadius:"10px", padding:"8px 14px", cursor:"pointer", fontWeight:500, transition:"all 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}
                        onMouseOver={e => { e.currentTarget.style.borderColor=TEAL; e.currentTarget.style.color=TEAL; e.currentTarget.style.background="#f0f9ff"; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor="#c5dfe6"; e.currentTarget.style.color="#1e293b"; e.currentTarget.style.background="white"; }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div style={{ display:"flex", alignItems:"flex-end", gap:"10px" }}>
              <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"white", border:"2px solid "+TEAL, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden", boxShadow:"0 0 0 3px rgba(42,143,163,0.12)" }}>
                <img src={FOX} alt="" style={{ width:"26px", objectFit:"contain" }} />
              </div>
              <div style={{ background:"white", borderLeft:"3px solid "+TEAL, borderRadius:"18px", borderBottomLeftRadius:"4px", padding:"12px 18px", display:"flex", gap:"5px", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
                {[0,1,2].map(i => <div key={i} style={{ width:"7px", height:"7px", borderRadius:"50%", background:TEAL, animation:"bounce 1s infinite", animationDelay:i*160+"ms" }} />)}
              </div>
            </div>
          )}

          {messages.length===1 && !loading && (
            <div style={{ paddingLeft:"46px", display:"flex", flexDirection:"column", gap:"8px" }}>
              {QUICK_STARTS.map((q,i) => (
                <button key={q} onClick={() => send(q)}
                  style={{ fontSize:"13px", background:"white", border:"1px solid #e0f0f5", color:"#1e293b", borderRadius:"12px", padding:"11px 16px", cursor:"pointer", fontWeight:500, textAlign:"left", display:"flex", alignItems:"center", gap:"10px", boxShadow:"0 1px 4px rgba(0,0,0,0.05)", transition:"all 0.2s" }}
                  onMouseOver={e => { e.currentTarget.style.borderColor=TEAL; e.currentTarget.style.background="#f0f9ff"; e.currentTarget.style.boxShadow="0 2px 8px rgba(42,143,163,0.15)"; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor="#e0f0f5"; e.currentTarget.style.background="white"; e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.05)"; }}>
                  <span style={{ width:"28px", height:"28px", borderRadius:"8px", background:"#f0f9fa", border:"1px solid #c5dfe6", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px", flexShrink:0 }}>
                    {["🗺️","🎙️","💡","⚔️"][i]}
                  </span>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      <footer style={{ background:"white", borderTop:"1px solid #e0f0f5", padding:"12px 16px", flexShrink:0, boxShadow:"0 -2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth:"640px", margin:"0 auto" }}>
          <div style={{ display:"flex", gap:"8px", alignItems:"flex-end" }}>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              rows={1} placeholder="Escribí tu consulta…"
              style={{ flex:1, resize:"none", border:"1.5px solid #c5dfe6", borderRadius:"16px", padding:"10px 16px", fontSize:"14px", fontFamily:"inherit", outline:"none", background:"#f8fcfd", lineHeight:1.5, transition:"border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor=TEAL}
              onBlur={e => e.target.style.borderColor="#c5dfe6"} />
            {hasSpeech && (
              <button onClick={toggleMic} title={isListening?"Detener":"Hablar"}
                style={{ borderRadius:"14px", padding:"10px 12px", fontSize:"16px", border:"1.5px solid "+(isListening?"#ef4444":"#c5dfe6"), cursor:"pointer", background:isListening?"#ef4444":"white", transition:"all 0.2s" }}>
                🎙️
              </button>
            )}
            <button onClick={() => send()} disabled={loading||!input.trim()}
              style={{ borderRadius:"14px", padding:"10px 20px", fontSize:"14px", fontWeight:600, border:"none", cursor:loading||!input.trim()?"not-allowed":"pointer", background:ORANGE, color:"white", opacity:loading||!input.trim()?0.4:1, transition:"opacity 0.2s" }}>
              Enviar
            </button>
          </div>
          {isListening && <p style={{ textAlign:"center", fontSize:"12px", color:"#ef4444", marginTop:"6px" }}>🔴 Escuchando... hablá ahora</p>}
        </div>
      </footer>

      <style>{"@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}"}</style>
    </div>
  );
}
