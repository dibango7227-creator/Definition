const fs = require('fs');

try {
    let html = fs.readFileSync('index.html', 'utf-8');
    
    // Replace Dish prices (d1-d6)
    html = html.replace(/data-id="d(\d+)"([\s\S]*?)data-price="\d+"/g, 'data-id="d$1"$2data-price="200"');
    html = html.replace(/(<h4 data-i18n="dish\d+_name">[\s\S]*?<\/h4>\s*<p data-i18n="dish\d+_desc">[\s\S]*?<\/p>\s*<div class="dish-bottom">)<span class="price">\$\d+<\/span>/g, '$1<span class="price">200 F</span>');
    
    // Replace Drink prices (r1-r3)
    html = html.replace(/data-id="r(\d+)"([\s\S]*?)data-price="\d+"/g, 'data-id="r$1"$2data-price="100"');
    html = html.replace(/(<h4 data-i18n="ref\d+_name">[\s\S]*?<\/h4>\s*<p data-i18n="ref\d+_desc">[\s\S]*?<\/p>\s*<div class="dish-bottom">\s*)<span class="price">\$\d+<\/span>/g, '$1<span class="price">100 F</span>');
    
    // Delivery text in html
    html = html.replace(/\(\+ 10\$\)/g, '(+ 500 F)');
    html = html.replace(/\$10\.00/g, '500 F');
    html = html.replace(/\(\+ \$10\)/g, '(+ 500 F)');

    fs.writeFileSync('index.html', html, 'utf-8');
    console.log('index.html updated');

    let js = fs.readFileSync('script.js', 'utf-8');
    js = js.replace(/<p style="margin:0; color:#888;">\$\$\{item\.price\.toFixed\(2\)}<\/p>/g, '<p style="margin:0; color:#888;">${item.price} F</p>');
    js = js.replace(/total \+= 10;/g, 'total += 500;');
    js = js.replace(/<td style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">\$\$\{item\.price\.toFixed\(2\)}<\/td>/g, '<td style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">${item.price} F</td>');
    js = js.replace(/<td style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">\$\$\{checkoutTotal\.toFixed\(2\)}<\/td>/g, '<td style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">${checkoutTotal} F</td>');
    js = js.replace(/document\.getElementById\('inv-subtotal'\)\.textContent = '\$' \+ subtotal\.toFixed\(2\);/g, "document.getElementById('inv-subtotal').textContent = subtotal + ' F';");
    js = js.replace(/document\.getElementById\('inv-total'\)\.textContent = '\$' \+ checkoutTotal\.toFixed\(2\);/g, "document.getElementById('inv-total').textContent = checkoutTotal + ' F';");
    js = js.replace(/document\.getElementById\('momo-total-price'\)\.textContent = checkoutTotal\.toFixed\(2\);/g, "document.getElementById('momo-total-price').textContent = checkoutTotal + ' F';");
    js = js.replace(/totalEl\.textContent = total\.toFixed\(2\);/g, "totalEl.textContent = total + ' F';");
    js = js.replace(/document\.getElementById\('res-price'\)\.textContent = price\.toFixed\(2\);/g, "document.getElementById('res-price').textContent = price + ' F';");

    fs.writeFileSync('script.js', js, 'utf-8');
    console.log('script.js updated');

    let server = fs.readFileSync('server.js', 'utf-8');
    server = server.replace(/Math\.round\(amount \* 600\)/g, 'Math.round(amount)');
    fs.writeFileSync('server.js', server, 'utf-8');
    console.log('server.js updated');

} catch(e) {
    console.error(e);
}
