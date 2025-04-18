/* tiny helpers */
const $  = (s,o=document)=>o.querySelector(s);
const $$ = (s,o=document)=>o.querySelectorAll(s);

/* ===== 全站：AOS + fade ===== */
AOS.init({duration:800,once:true});

// 立即触发 fade 动画
document.documentElement.classList.add('page-enter');
setTimeout(()=>document.documentElement.classList.add('page-enter-active'), 50);

/* ===== 公共：年份 & 移动菜单 ===== */
$('#year')?.textContent = new Date().getFullYear();
$('#menuBtn')?.addEventListener('click',e=>{
  const m = $('#mobileMenu');
  const show = m.classList.toggle('hidden');
  e.currentTarget.setAttribute('aria-expanded', !show);
});

/* ========== 首页特有逻辑 ========== */
if (document.body.dataset.page === 'home') {

  /* 滚动进度 */
  const bar = $('#progressBar');
  addEventListener('scroll',()=> {
    const p = scrollY /(document.body.scrollHeight - innerHeight)*100;
    bar.style.width = p + '%';
  });

  /* 侧边锚点高亮 */
  const ids = ['hero','about','skills','services','timeline','contact'];
  const dots = ids.map(id=>$('#dot-'+id));
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        dots.forEach(d=>d.classList.toggle('active',d.dataset.target===e.target.id));
      }
    });
  },{threshold:.6});
  ids.forEach(id=>io.observe($('#'+id)));

  /* 打开/关闭 Modal */
  window.openModal = ({title,desc})=>{
    $('#modalTitle').textContent = title;
    $('#modalDesc').textContent  = desc;
    $('#modal').classList.remove('hidden');
  };
  $('#modalClose').onclick = ()=>$('#modal').classList.add('hidden');
  $('#modal').onclick = e=>e.target.id==='modal'&&$('#modal').classList.add('hidden');

  /* 过滤按钮 → class 切换 */
  $$('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{
    const f = btn.dataset.filter;
    $$('.filter-btn').forEach(b=>b.classList.remove('ring-2','ring-white/80'));
    btn.classList.add('ring-2','ring-white/80');
    $$('.project-card').forEach(c=>{
      c.classList.toggle('hidden', f!=='all' && c.dataset.category!==f);
    });
  }));
}
