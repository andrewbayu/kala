import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'id'

interface LangCtx { lang: Lang; setLang: (l: Lang) => void }
const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    (localStorage.getItem('kala-lang') as Lang) || 'en'
  )
  function setLang(l: Lang) { setLangState(l); localStorage.setItem('kala-lang', l) }
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>
}

export function useLang() { return useContext(Ctx) }
