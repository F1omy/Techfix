
// Лабораторная работа - JavaScript функционал
// Событие DOMContentLoaded: скрипт начнет работу только когда HTML полностью загрузится
document.addEventListener('DOMContentLoaded', () => {
    // 1. Мобильное меню. Находим кнопку и вешаем обработчик клика (addEventListener)
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // Для дашборда
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.toggle('open');
            }
            // Для главной
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                if (navMenu.style.display === 'flex') {
                    navMenu.style.display = 'none';
                } else {
                    navMenu.style.display = 'flex';
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '80px';
                    navMenu.style.left = '0';
                    navMenu.style.width = '100%';
                    navMenu.style.background = 'rgba(13, 17, 23, 0.95)';
                    navMenu.style.padding = '20px';
                }
            }
        });
    }

    // 2. Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Форма отправки (Mock)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Отправка...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.innerHTML = 'Успешно отправлено! ✓';
                btn.style.background = '#22C55E';
                btn.style.opacity = '1';
                form.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    });

    // 4. Переключение ролей на странице входа
    const roleChips = document.querySelectorAll('.role-chip');
    roleChips.forEach(chip => {
        chip.addEventListener('click', () => {
            roleChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });

    // 5. Логика для страницы входа (Редирект на дашборд)
    const loginBtn = document.querySelector('.btn-login');
    const demoBtn = document.querySelector('.btn-demo');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Останавливаем стандартную отправку формы
            window.location.href = 'dashboard.html';
        });
    }
    if (demoBtn) {
        demoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'dashboard.html';
        });
    }

    // 6. Логика для Дашборда (Кликабельные элементы)
    const navItems = document.querySelectorAll('.nav-item');
    const topbarTitle = document.querySelector('.topbar-title');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Переключаем активный класс
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Меняем заголовок
            if (topbarTitle) {
                topbarTitle.textContent = item.textContent.trim();
            }
            
            // Если на мобилке — закрываем меню при клике
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && window.innerWidth < 768) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Кнопка уведомлений
    const notifBtn = document.querySelector('.notif-btn');
    if (notifBtn) {
        notifBtn.addEventListener('click', () => {
            alert('У вас 3 новых системных уведомления!');
            const badge = notifBtn.querySelector('.badge');
            if (badge) badge.style.display = 'none'; // Скрываем кружочек
        });
    }

    // Ссылки "Все заказы"
    const panelActions = document.querySelectorAll('.panel-action');
    panelActions.forEach(action => {
        action.addEventListener('click', () => {
            alert('Загрузка списка...');
        });
    });

    // 7. Логика CRUD для заказов (Дашборд)
    const showAddFormBtn = document.getElementById('showAddFormBtn');
    const addOrderForm = document.getElementById('addOrderForm');
    const saveOrderBtn = document.getElementById('saveOrderBtn');
    const ordersTbody = document.getElementById('ordersTbody');
    let orderCounter = 5042; // Следующий ID для новых заказов

    if (showAddFormBtn && addOrderForm) {
        // Показать/Скрыть форму добавления
        showAddFormBtn.addEventListener('click', () => {
            if (addOrderForm.style.display === 'none') {
                addOrderForm.style.display = 'flex';
                showAddFormBtn.textContent = '✕ Отмена';
                showAddFormBtn.style.color = '#EF4444';
                showAddFormBtn.style.background = 'rgba(239,68,68,0.15)';
            } else {
                addOrderForm.style.display = 'none';
                showAddFormBtn.textContent = '+ Новый заказ';
                showAddFormBtn.style.color = '#4F8EF7';
                showAddFormBtn.style.background = 'rgba(79,142,247,0.15)';
            }
        });

        // Добавление нового заказа
        saveOrderBtn.addEventListener('click', () => {
            const client = document.getElementById('inpClient').value || 'Неизвестно';
            const device = document.getElementById('inpDevice').value || 'Устройство';
            const master = document.getElementById('inpMaster').value || 'Не назначен';
            const price = document.getElementById('inpPrice').value || '₽ 0';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><span class="order-id">#${orderCounter++}</span></td>
                <td>${client}</td>
                <td>${device}</td>
                <td>${master}</td>
                <td><span class="status-badge s-new">Новый</span></td>
                <td>${price}</td>
                <td>
                  <button class="action-btn status-cycle" style="background:none;border:none;color:#4F8EF7;cursor:pointer;margin-right:8px;font-size:16px;" title="Сменить статус">↻</button>
                  <button class="action-btn delete-order" style="background:none;border:none;color:#EF4444;cursor:pointer;font-size:16px;" title="Удалить">✕</button>
                </td>
            `;
            // Добавляем в начало списка
            ordersTbody.insertBefore(tr, ordersTbody.firstChild);
            
            // Сбрасываем форму
            document.getElementById('inpClient').value = '';
            document.getElementById('inpDevice').value = '';
            document.getElementById('inpMaster').value = '';
            document.getElementById('inpPrice').value = '';
            addOrderForm.style.display = 'none';
            showAddFormBtn.textContent = '+ Новый заказ';
            showAddFormBtn.style.color = '#4F8EF7';
            showAddFormBtn.style.background = 'rgba(79,142,247,0.15)';
        });
    }

    // Делегирование событий для смены статуса и удаления (работает и для новых строк)
    if (ordersTbody) {
        ordersTbody.addEventListener('click', (e) => {
            // Удаление заказа
            if (e.target.classList.contains('delete-order')) {
                const tr = e.target.closest('tr');
                if (confirm('Вы уверены, что хотите удалить этот заказ?')) {
                    tr.remove();
                }
            }

            // Смена статуса (цикличная смена: Новый -> В ремонте -> Ожидает -> Готов -> Новый)
            if (e.target.classList.contains('status-cycle')) {
                const tr = e.target.closest('tr');
                const badge = tr.querySelector('.status-badge');
                
                if (badge.classList.contains('s-new')) {
                    badge.className = 'status-badge s-repair';
                    badge.textContent = 'В ремонте';
                } else if (badge.classList.contains('s-repair')) {
                    badge.className = 'status-badge s-wait';
                    badge.textContent = 'Ожидает';
                } else if (badge.classList.contains('s-wait')) {
                    badge.className = 'status-badge s-done';
                    badge.textContent = 'Готов';
                } else {
                    badge.className = 'status-badge s-new';
                    badge.textContent = 'Новый';
                }
            }
        });
    }
});
