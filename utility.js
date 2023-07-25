function getDatesMentioned(content) {
    const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
    return content.match(dateRegex) || [];
}
