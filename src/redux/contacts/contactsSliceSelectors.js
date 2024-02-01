import { createSelector } from '@reduxjs/toolkit';

const selectContacts = (store) => store.contacts;

export const selectContactsItems = createSelector(
    selectContacts,
    contacts => contacts.items
);

export const selectContactsFilter = createSelector(
    selectContacts,
    store => store.filter
)

export const selectContactIsAdding = createSelector(
    selectContacts,
    store => store.isAddingContact
)

export const selectContactIsRemoving = createSelector(
    selectContacts,
    store => store.isRemovingContact
)

export const selectContactsIsLoading = createSelector(
    selectContacts,
    store => store.isLoading
)

export const selectFilteredContacts = createSelector(
    [selectContactsItems, selectContactsFilter],
    (contacts, filter) => {
        return contacts.filter(contact => {
            return contact.name
                .toLowerCase()
                .includes(filter.trim().toLocaleLowerCase());
        })
    });