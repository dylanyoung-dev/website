import { useEffect } from 'react';
import { sendViewEvent } from 'react-sitecore-personalize';

const TrackEvent = ({ page, attributes, children }) => {
    useEffect(() => {
        if (page) {
            sendCustomPageEvent(page, attributes);
        }
    }, [page, attributes]);

    return children;
};

function sendCustomPageEvent(page: string, attributes: any) {
    if (!window._boxever) return;
    window._boxeverq.push(function () {
        let customPageViewEvent = {
            browser_id: window.Boxever.getID(),
            pos: window._boxever_settings.pointOfSale,
            channel: window._eventSettings.Channel,
            language: window._eventSettings.Language,
            currency: window._eventSettings.Currency,
            ext: attributes,
            type: 'VIEW',
            page: page
        };

        customPageViewEvent = window.Boxever.addUTMParams(customPageViewEvent);

        console.log({ customPageViewEvent });

        window.Boxever.eventCreate(customPageViewEvent, function (data: any) {}, 'json');
    });
}

export default TrackEvent;
