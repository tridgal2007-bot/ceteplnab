import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// 🔹 Conexão com o Supabase
const supabaseUrl = "https://zszcwubydhgoyhxbxfro.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzemN3dWJ5ZGhnb3loeGJ4ZnJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MDk5MDMsImV4cCI6MjA3NTM4NTkwM30.ryioOoPAZnZzGdcTxIjfUcSlYUUqa7arA4qlUukyV7M";
const supabase = createClient(supabaseUrl, supabaseKey);

// Função chamada após login do Google
async function handleCredentialResponse(response) {
  const data = parseJwt(response.credential);

  // 🔹 Salva no Supabase
  try {
    await supabase.from("usuarios").insert([{ 
      nome: data.name,
      email: data.email
    }]);
    alert("Bem-vindo, " + data.name + " (" + data.email + ")");
  } catch (error) {
    console.error("Erro ao salvar no Supabase:", error);
    alert("Erro ao salvar dados, veja o console.");
  }

  console.log("ID Token: ", response.credential);
  console.log("Usuário: ", data);
}

// Função para decodificar JWT do Google
function parseJwt(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
