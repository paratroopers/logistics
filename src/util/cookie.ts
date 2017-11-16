export class Cookies {
    static decoded(s) {
        return decodeURIComponent(s.replace(/\+/g, ' '));
    }
    static converted(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            return s;
        } catch (er) { }
    }
    static set(key, value, options?) {
        options = { ...{}, ...options };

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);
        return (document.cookie = [
            encodeURIComponent(key),
            '=',
            encodeURIComponent(value),
            options.expires ? '; expires=' + (typeof options.expires === 'string' ? options.expires : options.expires.toUTCString()) : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }
    static get(key): any {
        var decode = this.decoded;
        var cookies = document.cookie.split('; ');
        var result = key ? undefined : {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = decode(parts.join('='));

            if (key && key === name) {
                result = this.converted(cookie);
                break;
            }

            if (!key) {
                result[name] = this.converted(cookie);
            }
        }
        return result;
    }
    static getJSON(key) {
        if (this.get(key)) {
            return JSON.parse(this.get(key));
        }
        return null;
    }
    static remove(key) {

        if (this.get(key)) {
            this.set(key, '', { expires: -1 });
            return true;
        }
        return false;
    }
}