/**
 * Selectors.ts
 *
 * Selectors are basically helper methods for operating on the State
 * See Redux documents here fore more info:
 * http://redux.js.org/docs/recipes/ComputingDerivedData.html
 */

import * as State from "./State"

import { Rectangle } from "./Types"

import * as _ from "lodash"

export const isPopupMenuOpen = (state: State.IState) => {
    const popupMenu = state.popupMenu
    return !!popupMenu
}

export const areCompletionsVisible = (state: State.IState) => {
    const autoCompletion = state.autoCompletion
    const entryCount = (autoCompletion && autoCompletion.entries) ? autoCompletion.entries.length : 0

    if (entryCount === 0) {
        return false
    }

    if (entryCount > 1) {
        return true
    }

    // In the case of a single entry, should not be visible if the base is equal to the selected item
    return autoCompletion != null && autoCompletion.base !== getSelectedCompletion(state)
}

export const getSelectedCompletion = (state: State.IState) => {
    const autoCompletion = state.autoCompletion
    return autoCompletion ? autoCompletion.entries[autoCompletion.selectedIndex].label : null
}

export const getAllBuffers = (state: State.IState): State.IBuffer[] => {
    return state.buffers.allIds.map((id) => state.buffers.byId[id])
}

export const getErrors = (state: State.IState) => state.errors

export const getAllErrorsForFile = (fileName: string, errors: State.Errors) => {
    if (!fileName || !errors) {
        return []
    }

    const allErrorsByKey = errors[fileName]

    if (!allErrorsByKey) {
        return []
    }

    const arrayOfErrorsArray = Object.values(allErrorsByKey)
    return _.flatten(arrayOfErrorsArray)
}

export const getActiveWindow = (state: State.IState): State.IWindow => {
    if (state.windowState.activeWindow === null) {
        return null
    }

    const activeWindow = state.windowState.activeWindow
    return state.windowState.windows[activeWindow]
}

export const getActiveWindowDimensions = (state: State.IState): Rectangle => {
    const emptyRectangle = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    }

    const window = getActiveWindow(state)
    if (!window) {
        return emptyRectangle
    }

    return window.dimensions || emptyRectangle
}
