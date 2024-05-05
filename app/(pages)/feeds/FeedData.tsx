'use client'

import { useEffect, useState } from 'react';

function useFeedData(url: string) {
    const [data, setData] = useState<any|null>(null);

    useEffect(() => {
        fetch(`/api/v1/feed/preview?url=${ url }`)
            .then(response => response.json())
            .then(data => setData(data));
    }, [url]);

    return data;
}

export function FeedData(url: string) {
    const data = useFeedData(url);

    if (data === null) {
        throw new Promise(resolve => setTimeout(resolve, 1000));
    }

    return data;
}