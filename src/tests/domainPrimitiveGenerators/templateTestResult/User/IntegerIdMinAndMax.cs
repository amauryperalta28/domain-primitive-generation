using Wepsys.Core;

namespace RI.Novus.Core.Users;

///<summary>Represents User's IntegerIdMinAndMax</summary>
public sealed class IntegerIdMinAndMax : AbstractPositiveIntegerPrimitive
{
	private static readonly PositiveInteger MinValue = new(15);
	private static readonly PositiveInteger MinValue = new(40);

	/// <summary>
	/// Creates an instance of <see cref="IntegerIdMinAndMax"/>.
	/// <param name="rawValue"></param>
	/// </summary>
	public IntegerIdMinAndMax(PositiveInteger rawValue) : base(rawValue, MinValue, MaxValue)
	{
	}

	/// <summary>
	/// Shortcut for constructor <see cref="IntegerIdMinAndMax"/>.
	/// <param name="rawIntegerIdMinAndMax">Represents a integeridminandmax.</param>
	/// <returns>An instance of <see cref="IntegerIdMinAndMax"/></returns>
	/// </summary>
	public static IntegerIdMinAndMax From(int rawIntegerIdMinAndMax) => new(new PositiveInteger(rawIntegerIdMinAndMax));

}
