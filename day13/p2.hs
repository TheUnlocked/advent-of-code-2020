import Data.List.Split ( splitOn )

data GcdInfo = GcdInfo Int Int Int
    deriving (Show)

(|>) :: a -> (a -> b) -> b
v |> f = f v

extEuclid :: Int -> Int -> GcdInfo
extEuclid a 0 = GcdInfo a 1 0
extEuclid a b = 
    let GcdInfo d x y = extEuclid b (a `mod` b) in
        GcdInfo d y (x - y * div a b)

modularInverse :: Int -> Int -> Int
modularInverse inverted modulo =
    let GcdInfo _ x _ = extEuclid inverted modulo in
        if x >= 0 then x else x + modulo * (-div x modulo)

crt :: [Int] -> [Int] -> Int 
crt remainders mods =
    let prod = product mods in
        (`mod` prod) $
        sum $ zipWith 
            (\rem mod -> let prodOfOtherMods = div prod mod in
                rem * prodOfOtherMods * modularInverse prodOfOtherMods mod)
            remainders mods

main :: IO ()
main = do
    -- Run from in git root folder
    contents <- readFile "./inputs/day13"
    let busInfo = splitOn "\n" contents !! 1
            |> splitOn ","
            |> zip ([0..] :: [Int])
            |> filter (\(_, x:_) -> x /= 'x')
    let maxDelay = maximum $ map fst busInfo
    print $ busInfo
            |> map (\(i, x) -> (maxDelay - i, read x :: Int))
            |> unzip
            |> uncurry crt - maxDelay
