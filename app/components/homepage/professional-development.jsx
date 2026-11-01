'use client';
import {useEffect,useState} from 'react';
import {professionalDevelopment} from '@/utils/data/professional-development';

export default function ProfessionalDevelopment(){
  const [pdf,setPdf]=useState(null);
  useEffect(()=>{
    const esc=(event)=>{if(event.key==='Escape')setPdf(null)};
    window.addEventListener('keydown',esc);
    return ()=>window.removeEventListener('keydown',esc);
  },[]);
  const openPdf=(event)=>{
    const link=event.target.closest('a[href]');
    if(!link)return;
    const url=new URL(link.href,window.location.href);
    if(url.origin!==window.location.origin||!url.pathname.toLowerCase().endsWith('.pdf'))return;
    event.preventDefault();
    setPdf({url:url.href,title:link.textContent.trim().replace(/\s*[↗↓]\s*$/,'')||'Portfolio document'});
  };
  return <section id="professional-development" className="py-16 border-t border-slate-800">
    <p className="text-sm uppercase tracking-widest text-pink-400 mb-2">PRP372S · CPUT</p>
    <h2 className="text-3xl font-bold mb-4">Professional <span className="text-teal-300">Development</span></h2>
    <p className="text-slate-300 mb-10 max-w-3xl">Evidence of learning and STAR reflections from my Digital Portfolio for Project Presentation 3.</p>
    <div className="grid gap-5" onClick={openPdf}>{professionalDevelopment.map((item,i)=><details key={item.slug} id={item.slug} className="group rounded-xl border border-violet-500/30 bg-[#11152c] p-6 open:border-teal-400/50"><summary className="cursor-pointer list-none flex items-center justify-between gap-4"><div><p className="text-xs text-pink-400 mb-1">MODULE {String(i+1).padStart(2,'0')}</p><h3 className="text-xl font-semibold">{item.title}</h3><p className="text-slate-400 text-sm mt-2">{item.subtitle}</p></div><span className="text-2xl text-teal-300 group-open:rotate-45 transition-transform">+</span></summary><div className="portfolio-markdown mt-7 pt-6 border-t border-slate-700 text-slate-200" dangerouslySetInnerHTML={{__html:item.html}}/></details>)}</div>
    {pdf&&<div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-2 sm:p-5" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setPdf(null)}}>
      <div role="dialog" aria-modal="true" aria-label={`Preview: ${pdf.title}`} className="w-full max-w-6xl h-[94vh] flex flex-col overflow-hidden rounded-xl border border-violet-500/40 bg-[#11152c] shadow-2xl">
        <div className="flex items-center justify-between gap-3 px-3 sm:px-5 py-3 border-b border-slate-700">
          <div className="min-w-0"><p className="text-xs text-pink-400">PDF PREVIEW</p><h3 className="font-semibold text-white truncate">{pdf.title}</h3></div>
          <div className="flex items-center gap-2 shrink-0">
            <a href={pdf.url} download className="rounded-lg bg-teal-500 text-slate-950 px-3 py-2 text-sm font-semibold hover:bg-teal-300">Download PDF</a>
            <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-block rounded-lg border border-slate-600 px-3 py-2 text-sm hover:bg-slate-800">New tab</a>
            <button type="button" aria-label="Close PDF preview" onClick={()=>setPdf(null)} className="rounded-lg border border-slate-600 px-3 py-2 hover:bg-slate-800">✕</button>
          </div>
        </div>
        <iframe key={pdf.url} title={pdf.title} src={`${pdf.url}#toolbar=1&navpanes=0`} className="w-full flex-1 bg-white"/>
        <p className="text-xs text-slate-400 px-4 py-2">If your browser cannot display this PDF, choose New tab or Download PDF.</p>
      </div>
    </div>}
  </section>;
}
