# PinkWaters-Chat-Connect-Depression-App

Rediscover calmness, strengthen your mental resilience, and live a more peaceful life with PinkWaters. Start your journey toward inner harmony today. This app helps you to connect to peers like you. Our goal is to have an application for like minded people to connect and relieve their stress.

---
title: ZADD
description: Documentation for the DiceDB command ZADD
---

The `ZADD` command in DiceDB is used to add one or more members to a sorted set stored at the specified key. If a member already exists, its score is updated. This command supports various options - NX, XX, GT, LT, CH, INCR to control its behavior, such as conditional additions and score comparisons.

## Syntax

```bash
ZADD key [NX|XX] [LT|GT] [CH] [INCR] score member [score member ...]
```

## Parameters

| Parameter  | Description                                                                                               | Type   | Required |
| ---------- | --------------------------------------------------------------------------------------------------------- | ------ | -------- |
| `key`      | The key associated with the sorted set to which elements are to be added or updated                       | String | Yes      |
| `NX`       | Only add elements that do not exist in the sorted set                                                     | Flag   | No       |
| `XX`       | Only update elements that already exist in the sorted set                                                 | Flag   | No       |
| `LT`       | Only update elements if the new score is less than the current score                                      | Flag   | No       |
| `GT`       | Only update elements if the new score is greater than the current score                                   | Flag   | No       |
| `CH`       | Modify the return value to indicate the number of changed elements, rather than the number of new elements | Flag   | No       |
| `INCR`     | Increment the score of the specified member by the provided `score` rather than set the score directly    | Flag   | No       |
| `score`    | The score to associate with the member                                                                    | Float  | Yes      |
| `member`   | The member to add or update in the sorted set                                                             | String | Yes      |


## Return Value

| Condition                        | Return Value                                     |
| -------------------------------- | ------------------------------------------------ |
| If `CH` is set                   | Number of elements added or updated              |
| Without `CH`                     | Number of new elements added                     |
| With `INCR`                      | Updated score of the member                      |

## Behaviour

- DiceDB evaluates each specified flag in sequence to determine if the member should be added or updated.
- If `INCR` is specified, DiceDB increments the member's score by the provided value instead of setting it directly.
- Using both `NX` and `XX` simultaneously results in an error.
- If the key exists and is associated with a sorted set, the command processes according to the flags provided.
- If the key does not exist, a new sorted set is created at the specified key, and the member(s) are added with the specified score(s).
- If the key exists but is not associated with a sorted set, an error is returned.

## Errors

1. `Wrong type of key`:

   - Error Message: `(error) WRONGTYPE Operation against a key holding the wrong kind of value`
   - Occurs when attempting to use the command on a key that contains a non-sorted set value.

2. `Invalid combination of options`:

   - Error Message: `(error) ERR xx and nx options at the same time are not compatible`
   - Occurs if both `NX` and `XX` options are specified simultaneously, which is incompatible.

3. `Incompatible flags`:

   - Error Message: `(error) ERR gt, lt, and nx options at the same time are not compatible`
   - Occurs if any of the following combinations are used together: `GT` with `NX`, `LT` with `NX`, or `GT` with `LT`.

4. `INCR with multiple members`:

   - Error Message: `(error) ERR incr option supports a single increment-element pair`
   - Occurs if the `INCR` flag is specified with more than one score-member pair, as `INCR` only supports a single pair.

5. `Wrong number of arguments`:

   - Error Message: `(error) ERR syntax error`
   - Occurs if an odd number of arguments are provided, which indicates a missing score or member.


## Examples Usage

### Basic Usage

Creating a sorted set `myzset` with members and their scores. These examples include adding new members, updating existing members, and handling different command structures.

```bash
127.0.0.1:7379> ZADD myzset 1 "member1" 2 "member2"
(integer) 2  

127.0.0.1:7379> ZADD myzset 3 "member3" 4 "member4" 5 "member5"
(integer) 3  

127.0.0.1:7379> ZADD myzset 1 "member1" 2 "member2" 3 "member3" 4 "member4" 5 "member5"
(integer) 0  

127.0.0.1:7379> ZADD myzset 1 "member1" 2 "member2" 3 "member3" 4 "member4" 5 "member5" 6 "member6"
(integer) 1 

127.0.0.1:7379> ZADD myzset 1
(error) ERR wrong number of arguments for 'zadd' command
```

### Options NX, XX, GT, LT, CH, INCR Usage

1. The `NX` flag only adds members that do not already exist in the sorted set.

    ```bash
    127.0.0.1:7379> ZADD myzset NX 3 "member3" 2 "member2"
    (integer) 1 
    ```

2. The `XX` flag only updates members that already exist in the sorted set.

    ```bash
    127.0.0.1:7379> ZADD myzset XX 4 "member1" 5 "new_member"
    (integer) 1  
    ```

3. The `LT` flag updates a member’s score only if the new score is less than the current score.

    ```bash
    127.0.0.1:7379> ZADD myzset LT 0 "member1" 3 "member2"
    (integer) 1  
    ```

4. The `GT` flag updates a member’s score only if the new score is greater than the current score.

    ```bash
    127.0.0.1:7379> ZADD myzset GT 6 "member1" 1 "member2"
    (integer) 1  
    ```

5. The `CH` flag modifies the return value to indicate the number of elements that were changed (added or updated), rather than just newly added elements.

    ```bash
    127.0.0.1:7379> ZADD myzset CH 7 "member1" 8 "member3"
    (integer) 2 
    ```

6. The `INCR` flag increments the score of the specified member by the provided value rather than setting it directly. Only one member-score pair can be used with `INCR`.

    ```bash
    127.0.0.1:7379> ZADD myzset INCR 2 "member1"
    (integer) 5  
    ```

7. Using `NX` and `CH` flags together allows you to add only new members and return the count of elements changed.

    ```bash
    127.0.0.1:7379> ZADD myzset NX CH 9 "member4" 2 "member2"
    (integer) 1  
    ```

8. Using `XX` and `GT` flags together updates only existing members if the new score is greater than the current score.

    ```bash
    127.0.0.1:7379> ZADD myzset XX GT 10 "member1" 3 "member3"
    (integer) 1  
    ```

9. Combining `CH` and `INCR` flags increments an existing member's score and returns the updated score.

    ```bash
    127.0.0.1:7379> ZADD myzset CH INCR 3 "member1"
    (integer) 8  
    ```

## Invalid usages

1. Using `NX`, `XX`, `LT`, `CH`, and `INCR` Together.

    ```bash
    127.0.0.1:7379> ZADD myzset NX XX LT CH INCR 20 "member1"
    (error) ERR xx and nx options at the same time are not compatible
    ```

2. Using `NX`, `LT`, `GT`, and `INCR` Together.

    ```bash
    127.0.0.1:7379> ZADD myzset NX LT GT INCR 20 "member1"
    (error) ERR gt and LT and NX options at the same time are not compatible
    ```
3. Using `INCR` with `XX` and Multiple Members.

    ```bash
    127.0.0.1:7379> ZADD myzset XX INCR 20 "member1" 25 "member2"
    (error) ERR incr option supports a single increment-element pair
    ```

4. Using `GT` with `INCR` When the Increment Results in a Score Less Than the Current Score**

    The `GT` flag only updates the score if the new score after incrementing is greater than the current score. If the increment causes the score to be less than or equal to the current score, it returns `(nil)` to indicate no update was made.

    ```bash
    127.0.0.1:7379> ZADD myzset GT INCR -5 "member15"
    (nil)
    ```

5. Using `LT` with `INCR` When the Increment Results in a Score Greater Than the Current Score**

    The `LT` flag only updates the score if the new score after incrementing is less than the current score. If the increment causes the score to be greater than or equal to the current score, it returns `(nil)` to indicate no update was made.

    ```bash
    127.0.0.1:7379> ZADD myzset LT INCR 5 "member14"
    (nil) 
    ```
