import { useConnectBlusekyAccountMutation, useDeleteAccountMutation } from './api/client/account.api'
import { Account, AccountPlatform, PinterestAccountBoard } from './model/account.interface'
import { useSocialMediaAccounts } from './model/use-social-media-accounts-service'
import { AccountAvatar } from './ui/account-avatar'
import AccountCard from './ui/account-card'
import AccountPlatformBadge from './ui/account-platform-badge'
import PinterestBoardThumbnail from './ui/pinterest-board-thumbnail'

export { useGetAccountsQuery, useGetPinterestBoardsByAccountIdQuery } from './api/client/account.api'
export { getDisableMessage, isAccountDisabled } from './const/account-disable-config'
export { accountsPlatformConfig } from './const/account-platform-config'

export {
    AccountAvatar,
    AccountCard,
    AccountPlatform,
    AccountPlatformBadge,
    PinterestBoardThumbnail,
    useConnectBlusekyAccountMutation,
    useSocialMediaAccounts,
    useDeleteAccountMutation,
}
export type { Account, PinterestAccountBoard }
