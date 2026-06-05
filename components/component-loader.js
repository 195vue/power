/**
 * 组件加载器 - SPA版本 v2
 * 功能：动态加载Sidebar组件 + SPA页面切换
 * 修复：inline脚本执行、脚本时序、resize时序
 */

(function() {
    'use strict';

    const ComponentLoader = {
        /**
         * 加载Header组件
         */
        loadHeader: function(containerId = 'top-header') {
            if (document.getElementById(containerId)) return;

            const headerContainer = document.createElement('div');
            headerContainer.id = containerId;

            fetch('./components/header.html')
                .then(response => {
                    if (!response.ok) throw new Error('Failed to load header component');
                    return response.text();
                })
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const header = doc.querySelector('.top-header');
                    if (header) {
                        document.body.insertBefore(header, document.body.firstChild);
                    }
                })
                .catch(error => console.error('Error loading header component:', error));
        },

        /**
         * 加载Sidebar组件
         */
        loadSidebar: function(containerId = 'sidebar-container', currentPage = '') {
            if (document.getElementById(containerId)) return;

            const sidebarContainer = document.createElement('aside');
            sidebarContainer.id = containerId;
            sidebarContainer.className = 'sidebar';

            const isOverviewActive = currentPage === 'market-overview' || currentPage === 'review-dashboard';
            const isPredictActive = ['weather-dashboard','power-accuracy','load-forecast','price-forecast'].includes(currentPage);
            const isMediumActive = ['medium-position','medium-decision'].includes(currentPage);
            const isSpotActive = ['spot-market','price-calendar','spot-decision'].includes(currentPage);
            const isAdminActive = ['station-mgmt','scheme-mgmt','model-mgmt','meteo-mgmt','train-node','quote-strategy','data-interface','user-mgmt','sys-config','data-dict','audit-log'].includes(currentPage);

            const sidebarHTML = `
                <nav class="menu">
                    <div class="menu-item has-submenu ${isOverviewActive ? 'active' : ''}">
                        <div class="menu-title">
                            <span class="menu-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
                            </span>
                            <span>总览分析</span>
                            <span class="arrow">${isOverviewActive ? '▲' : '▼'}</span>
                        </div>
                        <ul class="submenu">
                            <li class="${currentPage === 'market-overview' ? 'active' : ''}" data-page="market-overview"><a href="javascript:void(0)" data-src="总览分析/市场行情/index.html">市场行情</a></li>
                            <li class="${currentPage === 'review-dashboard' ? 'active' : ''}" data-page="review-dashboard"><a href="javascript:void(0)" data-src="总览分析/复盘看板/index.html">复盘看板</a></li>
                        </ul>
                    </div>

                    <div class="menu-item has-submenu ${isPredictActive ? 'active' : ''}">
                        <div class="menu-title">
                            <span class="menu-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 16l4-8 4 4 4-6"/></svg>
                            </span>
                            <span>预测信息</span>
                            <span class="arrow">${isPredictActive ? '▲' : '▼'}</span>
                        </div>
                        <ul class="submenu">
                            <li data-page="weather-dashboard"><a href="javascript:void(0)" data-src="预测信息/气象信息看板/index.html">气象信息看板</a></li>
                            <li data-page="power-accuracy"><a href="javascript:void(0)" data-src="预测信息/功率预测精准分析/index.html">功率预测精准分析</a></li>
                            <li data-page="load-forecast"><a href="javascript:void(0)" data-src="预测信息/负荷预测/index.html">负荷预测</a></li>
                            <li data-page="price-forecast"><a href="javascript:void(0)" data-src="预测信息/电价预测/index.html">电价预测</a></li>
                        </ul>
                    </div>

                    <div class="menu-item has-submenu ${isMediumActive ? 'active' : ''}">
                        <div class="menu-title">
                            <span class="menu-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                            </span>
                            <span>中长期交易</span>
                            <span class="arrow">${isMediumActive ? '▲' : '▼'}</span>
                        </div>
                        <ul class="submenu">
                            <li data-page="medium-position"><a href="javascript:void(0)" data-src="中长期交易/中长期持仓/index.html">中长期持仓</a></li>
                            <li data-page="medium-decision"><a href="javascript:void(0)" data-src="中长期交易/中长期辅助决策/index.html">中长期辅助决策</a></li>
                        </ul>
                    </div>

                    <div class="menu-item has-submenu ${isSpotActive ? 'active' : ''}">
                        <div class="menu-title">
                            <span class="menu-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                            </span>
                            <span>现货交易</span>
                            <span class="arrow">${isSpotActive ? '▲' : '▼'}</span>
                        </div>
                        <ul class="submenu">
                            <li data-page="spot-market"><a href="javascript:void(0)" data-src="现货交易/现货市场/index.html">现货市场</a></li>
                            <li data-page="price-calendar"><a href="javascript:void(0)" data-src="现货交易/价格日历/index.html">价格日历</a></li>
                            <li data-page="spot-decision"><a href="javascript:void(0)" data-src="现货交易/现货辅助决策/index.html">现货辅助决策</a></li>
                        </ul>
                    </div>

                    <div class="menu-item has-submenu ${isAdminActive ? 'active' : ''}">
                        <div class="menu-title">
                            <span class="menu-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                            </span>
                            <span>后台数据维护</span>
                            <span class="arrow">${isAdminActive ? '▲' : '▼'}</span>
                        </div>
                        <ul class="submenu">
                            <li data-page="station-mgmt"><a href="javascript:void(0)" data-src="后台数据维护/场站信息管理/index.html">场站信息管理</a></li>
                            <li data-page="scheme-mgmt"><a href="javascript:void(0)" data-src="后台数据维护/算法方案管理/index.html">算法方案管理</a></li>
                            <li data-page="model-mgmt"><a href="javascript:void(0)" data-src="后台数据维护/模型对接管理/index.html">模型对接管理</a></li>
                            <li data-page="meteo-mgmt"><a href="javascript:void(0)" data-src="后台数据维护/气象数据对接/index.html">气象数据对接</a></li>
                            <li data-page="train-node"><a href="javascript:void(0)" data-src="后台数据维护/训练节点管理/index.html">训练节点管理</a></li>
                            <li data-page="quote-strategy"><a href="javascript:void(0)" data-src="后台数据维护/报价策略管理/index.html">报价策略管理</a></li>
                            <li data-page="data-interface"><a href="javascript:void(0)" data-src="后台数据维护/外部数据接口/index.html">外部数据接口</a></li>
                            <li data-page="user-mgmt"><a href="javascript:void(0)" data-src="后台数据维护/用户管理/index.html">用户管理</a></li>
                            <li data-page="sys-config"><a href="javascript:void(0)" data-src="后台数据维护/系统参数配置/index.html">系统参数配置</a></li>
                            <li data-page="data-dict"><a href="javascript:void(0)" data-src="后台数据维护/数据字典/index.html">数据字典</a></li>
                            <li data-page="audit-log"><a href="javascript:void(0)" data-src="后台数据维护/操作日志/index.html">操作日志</a></li>
                        </ul>
                    </div>
                </nav>
                    <div class="sidebar-toggle-area">
                        <button class="sidebar-toggle-btn" title="折叠侧边栏">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                        </button>
                    </div>
            `;

            sidebarContainer.innerHTML = sidebarHTML;

            const container = document.querySelector('.container');
            if (container) {
                container.insertBefore(sidebarContainer, container.firstChild);
                this.initMenuInteraction();
                this.initSidebarToggle();
                this.initPageNavigation();
                this.restoreSidebarState();
            } else {
                console.error('Container element not found');
            }
        },

        /**
         * 清理当前页面：销毁ECharts实例、移除页面CSS/脚本、清空内容
         */
        cleanupPage: function() {
            const content = document.getElementById('page-content');
            if (!content) return;

            // 销毁所有ECharts实例
            if (typeof echarts !== 'undefined') {
                content.querySelectorAll('[id$="-chart"], .chart-container, [id*="chart"]').forEach(function(el) {
                    try {
                        var instance = echarts.getInstanceByDom(el);
                        if (instance) instance.dispose();
                    } catch(e) {}
                });
            }

            // 移除页面专用样式
            document.querySelectorAll('style[data-page-css]').forEach(function(el) {
                el.remove();
            });

            // 移除页面专用脚本
            document.querySelectorAll('script[data-page-script]').forEach(function(el) {
                el.remove();
            });

            // 清空内容
            content.innerHTML = '';
            content.className = '';
        },

        /**
         * 加载页面专用CSS
         */
        loadPageCSS: function(cssPath) {
            var self = this;
            fetch(cssPath)
                .then(function(response) {
                    if (!response.ok) return '';
                    return response.text();
                })
                .then(function(cssText) {
                    if (!cssText) return;
                    // 移除iframe适配规则的 .main-content { margin-left: 0; }
                    cssText = cssText.replace(/\.main-content\s*\{[^}]*margin-left\s*:\s*0[^}]*\}/g, '');
                    cssText = cssText.replace(/\/\* Iframe: override sidebar margin \*\//g, '');

                    var style = document.createElement('style');
                    style.setAttribute('data-page-css', cssPath);
                    style.textContent = cssText;
                    document.head.appendChild(style);
                })
                .catch(function() {});
        },

        /**
         * 执行单段页面脚本（处理 DOMContentLoaded + resize 兼容）
         */
        executePageScript: function(code, scriptId) {
            try {
                // DOM已加载完成，移除 DOMContentLoaded 包裹
                if (document.readyState !== 'loading' && code.indexOf('DOMContentLoaded') !== -1) {
                    // 移除 document.addEventListener('DOMContentLoaded', function() { 开头
                    code = code.replace(
                        /document\.addEventListener\s*\(\s*['"]DOMContentLoaded['"]\s*,\s*function\s*\(\)\s*\{/,
                        '(function() {'
                    );
                    // 移除末尾 }); （关闭 DOMContentLoaded 的 addEventListener 调用）
                    code = code.replace(/\}\);?\s*$/, '})();');
                }

                // 移除内联 resize 处理（由全局统一处理）
                code = code.replace(/\/\/ 响应式调整[\s\S]*?\}\);/g, '');
                code = code.replace(/\/\/ 窗口大小改变时重新调整图表[\s\S]*?\}\);/g, '');

                // Only wrap in IIFE when code uses const/let (which throw on re-declaration
                // when navigating back). For var/function-only code, skip IIFE so that
                // onclick="fn()" handlers in innerHTML can reach the function scope.
                if (/\b(const|let)\s/.test(code)) {
                    code = '(function(){\n' + code + '\n})();';
                }

                var scriptEl = document.createElement('script');
                scriptEl.setAttribute('data-page-script', scriptId);
                scriptEl.textContent = code;
                document.body.appendChild(scriptEl);
            } catch(e) {
                console.warn('Script execution error:', scriptId, e);
            }
        },

        /**
         * 强制刷新所有 ECharts 图表
         */
        resizeAllCharts: function() {
            var content = document.getElementById('page-content');
            if (!content) return;
            content.querySelectorAll('[id$="-chart"], .chart-container, [id*="chart"]').forEach(function(el) {
                try {
                    var instance = echarts.getInstanceByDom(el);
                    if (instance) instance.resize();
                } catch(e) {}
            });
        },

        /**
         * 加载页面内容（SPA方式，修复inline脚本 + 时序）
         */
        loadPageContent: function(src) {
            var self = this;
            self.cleanupPage();

            var content = document.getElementById('page-content');
            if (!content) return;

            content.className = 'loading';

            fetch(src)
                .then(function(response) {
                    if (!response.ok) throw new Error('Failed to load: ' + src);
                    return response.text();
                })
                .then(function(html) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(html, 'text/html');

                    // 提取主内容区域
                    var mainContent = doc.querySelector('.main-content');
                    if (!mainContent) {
                        content.className = '';
                        content.innerHTML = '<div style="padding:40px;text-align:center;color:var(--muted)">页面内容加载失败</div>';
                        return;
                    }

                    // 注入内容HTML（同步 — DOM立即可用）
                    content.innerHTML = mainContent.innerHTML;
                    content.className = '';

                    // 加载页面CSS
                    var pageDir = src.substring(0, src.lastIndexOf('/'));
                    var cssLinks = doc.querySelectorAll('link[rel="stylesheet"]');
                    cssLinks.forEach(function(link) {
                        var href = link.getAttribute('href');
                        if (!href || href.indexOf('../') !== -1) return;
                        self.loadPageCSS(pageDir + '/' + href);
                    });

                    // 捕获页面内联 <style> 块（在<head>或<body>中均可）
                    var styleBlocks = doc.querySelectorAll('style');
                    styleBlocks.forEach(function(styleEl) {
                        var cssText = styleEl.textContent.trim();
                        if (!cssText) return;
                        // 跳过已经被标记为 data-page-css 的
                        if (styleEl.getAttribute('data-page-css') !== null) return;
                        var style = document.createElement('style');
                        style.setAttribute('data-page-css', src + '#style');
                        style.textContent = cssText;
                        document.head.appendChild(style);
                    });

                    // ─── 顺序执行脚本 ──────────────────────────────
                    // 收集所有脚本执行任务（inline → external，按HTML中出现的顺序）
                    var scriptTasks = [];

                    // 1) Inline scripts（复盘看板等页面的 <script>...</script>）
                    var allScripts = doc.querySelectorAll('script');
                    var seenExternalSrcs = {};

                    allScripts.forEach(function(script) {
                        var srcAttr = script.getAttribute('src');

                        // 跳过ECharts CDN（已在全局加载）
                        if (srcAttr && srcAttr.indexOf('echarts') !== -1) return;

                        if (srcAttr) {
                            // 外部脚本 — 去重
                            var absolutePath = pageDir + '/' + srcAttr;
                            if (seenExternalSrcs[absolutePath]) return;
                            seenExternalSrcs[absolutePath] = true;

                            scriptTasks.push({
                                type: 'external',
                                path: absolutePath
                            });
                        } else {
                            // Inline脚本
                            var code = script.textContent.trim();
                            if (!code) return;
                            scriptTasks.push({
                                type: 'inline',
                                code: code
                            });
                        }
                    });

                    // 顺序执行脚本任务，完成后resize图表
                    function runScripts(tasks, index) {
                        if (index >= tasks.length) {
                            // 所有脚本执行完毕 → 触发resize让ECharts自适应
                            setTimeout(function() {
                                self.resizeAllCharts();
                                try { window.dispatchEvent(new Event('resize')); } catch(e) {}
                            }, 30);
                            return;
                        }

                        var task = tasks[index];

                        if (task.type === 'inline') {
                            self.executePageScript(task.code, src + '#inline-' + index);
                            // inline脚本在appendChild时同步执行
                            runScripts(tasks, index + 1);
                        } else {
                            // 外部脚本 — fetch文本后执行
                            fetch(task.path)
                                .then(function(res) {
                                    if (!res.ok) throw new Error('HTTP ' + res.status);
                                    return res.text();
                                })
                                .then(function(code) {
                                    self.executePageScript(code, task.path);
                                    // 同步执行完成，继续下一个
                                    runScripts(tasks, index + 1);
                                })
                                .catch(function(error) {
                                    console.warn('Failed to load script:', task.path, error);
                                    runScripts(tasks, index + 1);
                                });
                        }
                    }

                    // 开始执行脚本队列
                    runScripts(scriptTasks, 0);
                })
                .catch(function(error) {
                    console.error('Error loading page content:', error);
                    content.className = '';
                    content.innerHTML = '<div style="padding:40px;text-align:center;color:var(--muted)">页面加载失败</div>';
                });
        },

        /**
         * 初始化页面导航（SPA方式）
         */
        initPageNavigation: function() {
            var self = this;
            var submenuLinks = document.querySelectorAll('.submenu li a[data-src]');

            submenuLinks.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    var src = this.getAttribute('data-src');
                    var targetLi = this.parentElement;
                    var pageKey = targetLi.getAttribute('data-page');

                    // SPA方式加载页面内容
                    self.loadPageContent(src);

                    // 更新页面标题
                    document.title = '新能源电力交易辅助决策系统 - ' + this.textContent;

                    // 清除所有active状态
                    document.querySelectorAll('.submenu li').forEach(function(li) {
                        li.classList.remove('active');
                    });
                    // 设置当前active
                    targetLi.classList.add('active');

                    // 展开当前菜单的父级，收起其他菜单
                    var parentMenuItem = targetLi.closest('.menu-item');
                    document.querySelectorAll('.menu-item.has-submenu').forEach(function(item) {
                        if (item !== parentMenuItem) {
                            item.classList.remove('active');
                            var arrow = item.querySelector('.arrow');
                            if (arrow) arrow.textContent = '▼';
                        }
                    });
                    if (parentMenuItem) {
                        parentMenuItem.classList.add('active');
                        var arrow = parentMenuItem.querySelector('.arrow');
                        if (arrow) arrow.textContent = '▲';
                    }
                });
            });
        },

        /**
         * 初始化菜单交互
         */
        initMenuInteraction: function() {
            var menuItems = document.querySelectorAll('.menu-item.has-submenu');

            menuItems.forEach(function(menuItem) {
                var menuTitle = menuItem.querySelector('.menu-title');
                var arrow = menuTitle.querySelector('.arrow');

                menuTitle.addEventListener('click', function(e) {
                    e.preventDefault();

                    var isCurrentlyActive = menuItem.classList.contains('active');

                    // 先收起所有其他菜单
                    menuItems.forEach(function(otherItem) {
                        if (otherItem !== menuItem && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            var otherArrow = otherItem.querySelector('.arrow');
                            if (otherArrow) otherArrow.textContent = '▼';
                        }
                    });

                    // 切换当前菜单项
                    if (isCurrentlyActive) {
                        menuItem.classList.remove('active');
                        if (arrow) arrow.textContent = '▼';
                    } else {
                        menuItem.classList.add('active');
                        if (arrow) arrow.textContent = '▲';
                    }
                });
            });
        },

        /**
         * 初始化侧边栏折叠/展开功能
         */
        initSidebarToggle: function() {
            var self = this;
            var toggleBtn = document.querySelector('.sidebar-toggle-btn');
            if (!toggleBtn) return;

            toggleBtn.addEventListener('click', function() {
                var sidebar = document.querySelector('.sidebar');
                var isCollapsed = sidebar.classList.toggle('collapsed');
                document.body.classList.toggle('sidebar-collapsed', isCollapsed);
                localStorage.setItem('sidebarCollapsed', isCollapsed);

                // 更新按钮 tooltip 和图标
                var svg = this.querySelector('svg');
                if (isCollapsed) {
                    this.title = '展开侧边栏';
                    if (svg) svg.innerHTML = '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="15" y1="3" x2="15" y2="21"/>';
                } else {
                    this.title = '折叠侧边栏';
                    if (svg) svg.innerHTML = '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/>';
                }

                // 清理 flyout
                self.removeFlyout();

                // 折叠时重新初始化 flyout，展开时解绑
                if (isCollapsed) {
                    self.initCollapsedFlyout();
                } else {
                    self.destroyCollapsedFlyout();
                }

                // 重新调整图表
                setTimeout(function() { self.resizeAllCharts(); }, 300);
            });
        },

        /**
         * 移除悬浮 flyout DOM
         */
        removeFlyout: function() {
            var el = document.getElementById('sidebar-flyout');
            if (el) el.remove();
        },

        /**
         * 销毁 collapsed flyout 监听
         */
        destroyCollapsedFlyout: function() {
            this.removeFlyout();
            var sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.removeAttribute('data-flyout-bound');
                // 移除所有 flyout 事件监听
                if (sidebar._flyoutOver) {
                    sidebar.removeEventListener('mouseover', sidebar._flyoutOver);
                    delete sidebar._flyoutOver;
                }
                if (sidebar._flyoutOut) {
                    sidebar.removeEventListener('mouseout', sidebar._flyoutOut);
                    delete sidebar._flyoutOut;
                }
                if (sidebar._flyoutDocHover) {
                    document.removeEventListener('mouseover', sidebar._flyoutDocHover);
                    delete sidebar._flyoutDocHover;
                }
            }
        },

        /**
         * 初始化折叠模式 flyout（事件委托，固定定位）
         */
        initCollapsedFlyout: function() {
            var self = this;
            var sidebar = document.querySelector('.sidebar');
            if (!sidebar || !sidebar.classList.contains('collapsed') || sidebar.getAttribute('data-flyout-bound') === 'true') return;
            sidebar.setAttribute('data-flyout-bound', 'true');

            var showTimer = null;
            var hideTimer = null;
            var currentItem = null;

            function hideFlyout(delay) {
                clearTimeout(showTimer);
                clearTimeout(hideTimer);
                hideTimer = setTimeout(function() {
                    var flyout = document.getElementById('sidebar-flyout');
                    if (flyout) {
                        flyout.classList.remove('visible');
                        setTimeout(function() {
                            if (flyout.parentNode) flyout.remove();
                        }, 150);
                    }
                    currentItem = null;
                }, delay || 150);
            }

            sidebar._flyoutOver = function(e) {
                var item = e.target.closest('.menu-item.has-submenu');
                if (!item) return;

                // 如果移到 flyout 内，不隐藏
                var flyout = document.getElementById('sidebar-flyout');
                if (flyout && flyout.contains(e.target)) return;

                if (item === currentItem) {
                    clearTimeout(hideTimer);
                    return;
                }

                // 新菜单项 — 创建 flyout
                currentItem = item;
                clearTimeout(showTimer);
                clearTimeout(hideTimer);
                self.removeFlyout();

                showTimer = setTimeout(function() {
                    var rect = item.getBoundingClientRect();
                    var titleEl = item.querySelector('.menu-title span:not(.menu-icon):not(.arrow)');
                    var title = titleEl ? titleEl.textContent.trim() : '';
                    var submenu = item.querySelector('.submenu');

                    var flyout = document.createElement('div');
                    flyout.id = 'sidebar-flyout';
                    flyout.className = 'sidebar-flyout';

                    // 标题行
                    var header = document.createElement('div');
                    header.className = 'flyout-title';
                    header.textContent = title;
                    flyout.appendChild(header);

                    // 子菜单项
                    if (submenu) {
                        var links = submenu.querySelectorAll('li');
                        links.forEach(function(li) {
                            var link = li.querySelector('a');
                            var text = link ? link.textContent : li.textContent;
                            var src = link ? link.getAttribute('data-src') : '';
                            var page = li.getAttribute('data-page') || '';
                            var isActive = li.classList.contains('active');

                            var fi = document.createElement('div');
                            fi.className = 'flyout-item' + (isActive ? ' active' : '');
                            fi.textContent = text;
                            fi.setAttribute('data-src', src || '');
                            fi.setAttribute('data-page', page);
                            fi.addEventListener('click', function(ev) {
                                ev.stopPropagation();
                                if (src) {
                                    self.loadPageContent(src);
                                    document.title = '新能源电力交易辅助决策系统 - ' + text;
                                    document.querySelectorAll('.submenu li').forEach(function(s) { s.classList.remove('active'); });
                                    document.querySelectorAll('.flyout-item').forEach(function(f) { f.classList.remove('active'); });
                                    fi.classList.add('active');
                                    if (link) link.parentElement.classList.add('active');
                                }
                                self.removeFlyout();
                                currentItem = null;
                            });
                            flyout.appendChild(fi);
                        });
                    }

                    // 定位（不超出视口）
                    var top = rect.top;
                    var left = rect.right + 2;
                    if (top + 320 > window.innerHeight) {
                        top = Math.max(8, window.innerHeight - 320);
                    }
                    flyout.style.top = top + 'px';
                    flyout.style.left = left + 'px';
                    document.body.appendChild(flyout);

                    requestAnimationFrame(function() {
                        flyout.classList.add('visible');
                    });
                }, 200);
            };
            sidebar.addEventListener('mouseover', sidebar._flyoutOver);

            sidebar._flyoutOut = function(e) {
                // 只在真正离开 menu-item 或 flyout 时隐藏
                var item = e.target.closest('.menu-item.has-submenu');
                var flyout = document.getElementById('sidebar-flyout');

                if (item) {
                    var related = e.relatedTarget;
                    // 移入 flyout 不隐藏
                    if (flyout && related && flyout.contains(related)) return;
                    // 仍在同一 menu-item 内不隐藏
                    if (related && item.contains(related)) return;
                    hideFlyout(200);
                }
            };
            sidebar.addEventListener('mouseout', sidebar._flyoutOut);

            // 监听 flyout hover 保持（可清理的命名引用）
            sidebar._flyoutDocHover = function(e) {
                var flyout = document.getElementById('sidebar-flyout');
                if (flyout && flyout.contains(e.target)) {
                    clearTimeout(hideTimer);
                }
            };
            document.addEventListener('mouseover', sidebar._flyoutDocHover);
        },

        /**
         * 恢复侧边栏状态
         */
        restoreSidebarState: function() {
            var self = this;
            var isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            if (isCollapsed) {
                var sidebar = document.querySelector('.sidebar');
                var toggleBtn = document.querySelector('.sidebar-toggle-btn');
                if (sidebar) sidebar.classList.add('collapsed');
                document.body.classList.add('sidebar-collapsed');
                if (toggleBtn) {
                    toggleBtn.title = '展开侧边栏';
                    var svg = toggleBtn.querySelector('svg');
                    if (svg) svg.innerHTML = '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="15" y1="3" x2="15" y2="21"/>';
                }
                // 初始化 flyout
                setTimeout(function() { self.initCollapsedFlyout(); }, 100);
            }
        },

        /**
         * 同时加载Header和Sidebar
         */
        loadAll: function(currentPage) {
            this.loadHeader();
            this.loadSidebar('sidebar', currentPage);
        }
    };

    // 导出到全局
    window.ComponentLoader = ComponentLoader;

})();
